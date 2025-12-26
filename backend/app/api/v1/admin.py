"""
Admin API endpoints for managing master/global tables.
These endpoints are admin-only and allow CRUD operations on:
- Subscriptions (plans)
- Entitlements
- Pricing Plan Country Prices
- App Settings
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.core.database import get_db
from app.api.dependencies import get_admin_user
from app.models.user import User
from app.models.subscription import Subscription
from app.models.entitlement import Entitlement
from app.models.pricing_plan_country_price import PricingPlanCountryPrice
from app.models.app_setting import AppSetting
from app.schemas.subscription import (
    SubscriptionCreate,
    SubscriptionUpdate,
    SubscriptionResponse
)
from app.schemas.entitlement import (
    EntitlementCreate,
    EntitlementUpdate,
    EntitlementResponse
)
from app.schemas.pricing_plan_country_price import (
    PricingPlanCountryPriceCreate,
    PricingPlanCountryPriceUpdate,
    PricingPlanCountryPriceResponse
)
from app.schemas.app_setting import (
    AppSettingCreate,
    AppSettingUpdate,
    AppSettingResponse
)

router = APIRouter(prefix="/admin", tags=["admin"])


# ==================== SUBSCRIPTIONS ====================

@router.get("/subscriptions", response_model=List[SubscriptionResponse])
async def list_subscriptions(
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """List all subscription plans."""
    plans = db.query(Subscription).order_by(Subscription.created_at.desc()).all()
    return [SubscriptionResponse.from_orm(plan) for plan in plans]


@router.post("/subscriptions", response_model=SubscriptionResponse, status_code=status.HTTP_201_CREATED)
async def create_subscription(
    plan_data: SubscriptionCreate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new subscription plan."""
    plan = Subscription(
        name=plan_data.name,
        description=plan_data.description,
        is_highlighted=plan_data.is_highlighted,
        limits=plan_data.limits,
        support_level=plan_data.support_level,
        features=plan_data.features,
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return SubscriptionResponse.from_orm(plan)


@router.get("/subscriptions/{subscription_id}", response_model=SubscriptionResponse)
async def get_subscription(
    subscription_id: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get a specific subscription plan."""
    try:
        plan_uuid = UUID(subscription_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription ID format"
        )
    
    plan = db.query(Subscription).filter(Subscription.id == plan_uuid).first()
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription plan not found"
        )
    
    return SubscriptionResponse.from_orm(plan)


@router.patch("/subscriptions/{subscription_id}", response_model=SubscriptionResponse)
async def update_subscription(
    subscription_id: str,
    plan_data: SubscriptionUpdate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Update a subscription plan."""
    try:
        plan_uuid = UUID(subscription_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription ID format"
        )
    
    plan = db.query(Subscription).filter(Subscription.id == plan_uuid).first()
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription plan not found"
        )
    
    # Update fields
    if plan_data.name is not None:
        plan.name = plan_data.name
    if plan_data.description is not None:
        plan.description = plan_data.description
    if plan_data.is_highlighted is not None:
        plan.is_highlighted = plan_data.is_highlighted
    if plan_data.limits is not None:
        plan.limits = plan_data.limits
    if plan_data.support_level is not None:
        plan.support_level = plan_data.support_level
    if plan_data.features is not None:
        plan.features = plan_data.features
    if plan_data.sort_order is not None:
        plan.sort_order = plan_data.sort_order
    
    db.commit()
    db.refresh(plan)
    return SubscriptionResponse.from_orm(plan)


@router.delete("/subscriptions/{subscription_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subscription(
    subscription_id: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a subscription plan (cascades to entitlements and country prices)."""
    try:
        plan_uuid = UUID(subscription_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription ID format"
        )
    
    plan = db.query(Subscription).filter(Subscription.id == plan_uuid).first()
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription plan not found"
        )
    
    db.delete(plan)
    db.commit()
    return None


# ==================== ENTITLEMENTS ====================

@router.get("/subscriptions/{subscription_id}/entitlements", response_model=List[EntitlementResponse])
async def list_entitlements(
    subscription_id: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """List all entitlements for a subscription plan."""
    try:
        plan_uuid = UUID(subscription_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription ID format"
        )
    
    entitlements = db.query(Entitlement).filter(
        Entitlement.subscription_id == plan_uuid
    ).order_by(Entitlement.category, Entitlement.entitlement).all()
    
    return [EntitlementResponse.from_orm(ent) for ent in entitlements]


@router.post("/subscriptions/{subscription_id}/entitlements", response_model=EntitlementResponse, status_code=status.HTTP_201_CREATED)
async def create_entitlement(
    subscription_id: str,
    entitlement_data: EntitlementCreate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new entitlement for a subscription plan."""
    try:
        plan_uuid = UUID(subscription_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription ID format"
        )
    
    # Verify subscription exists
    plan = db.query(Subscription).filter(Subscription.id == plan_uuid).first()
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription plan not found"
        )
    
    entitlement = Entitlement(
        subscription_id=plan_uuid,
        category=entitlement_data.category,
        entitlement=entitlement_data.entitlement,
        unit=entitlement_data.unit,
        quota=entitlement_data.quota,
    )
    db.add(entitlement)
    db.commit()
    db.refresh(entitlement)
    return EntitlementResponse.from_orm(entitlement)


@router.patch("/entitlements/{entitlement_id}", response_model=EntitlementResponse)
async def update_entitlement(
    entitlement_id: str,
    entitlement_data: EntitlementUpdate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Update an entitlement."""
    try:
        ent_uuid = UUID(entitlement_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid entitlement ID format"
        )
    
    entitlement = db.query(Entitlement).filter(Entitlement.id == ent_uuid).first()
    if not entitlement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entitlement not found"
        )
    
    # Update fields
    if entitlement_data.category is not None:
        entitlement.category = entitlement_data.category
    if entitlement_data.entitlement is not None:
        entitlement.entitlement = entitlement_data.entitlement
    if entitlement_data.unit is not None:
        entitlement.unit = entitlement_data.unit
    if entitlement_data.quota is not None:
        entitlement.quota = entitlement_data.quota
    
    db.commit()
    db.refresh(entitlement)
    return EntitlementResponse.from_orm(entitlement)


@router.delete("/entitlements/{entitlement_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_entitlement(
    entitlement_id: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Delete an entitlement."""
    try:
        ent_uuid = UUID(entitlement_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid entitlement ID format"
        )
    
    entitlement = db.query(Entitlement).filter(Entitlement.id == ent_uuid).first()
    if not entitlement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entitlement not found"
        )
    
    db.delete(entitlement)
    db.commit()
    return None


# ==================== PRICING PLAN COUNTRY PRICES ====================

@router.get("/subscriptions/{subscription_id}/country-prices", response_model=List[PricingPlanCountryPriceResponse])
async def list_country_prices(
    subscription_id: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """List all country prices for a subscription plan."""
    try:
        plan_uuid = UUID(subscription_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription ID format"
        )
    
    prices = db.query(PricingPlanCountryPrice).filter(
        PricingPlanCountryPrice.plan_id == plan_uuid
    ).order_by(PricingPlanCountryPrice.country_code, PricingPlanCountryPrice.billing_interval).all()
    
    return [PricingPlanCountryPriceResponse.from_orm(price) for price in prices]


@router.post("/subscriptions/{subscription_id}/country-prices", response_model=PricingPlanCountryPriceResponse, status_code=status.HTTP_201_CREATED)
async def create_country_price(
    subscription_id: str,
    price_data: PricingPlanCountryPriceCreate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new country price for a subscription plan."""
    try:
        plan_uuid = UUID(subscription_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription ID format"
        )
    
    # Verify subscription exists
    plan = db.query(Subscription).filter(Subscription.id == plan_uuid).first()
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription plan not found"
        )
    
    price = PricingPlanCountryPrice(
        plan_id=plan_uuid,
        country_code=price_data.country_code,
        currency=price_data.currency,
        billing_interval=price_data.billing_interval,
        price=price_data.price,
        is_active=price_data.is_active,
    )
    db.add(price)
    db.commit()
    db.refresh(price)
    return PricingPlanCountryPriceResponse.from_orm(price)


@router.patch("/country-prices/{price_id}", response_model=PricingPlanCountryPriceResponse)
async def update_country_price(
    price_id: str,
    price_data: PricingPlanCountryPriceUpdate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Update a country price."""
    try:
        price_uuid = UUID(price_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid price ID format"
        )
    
    price = db.query(PricingPlanCountryPrice).filter(PricingPlanCountryPrice.id == price_uuid).first()
    if not price:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Country price not found"
        )
    
    # Update fields
    if price_data.country_code is not None:
        price.country_code = price_data.country_code
    if price_data.currency is not None:
        price.currency = price_data.currency
    if price_data.billing_interval is not None:
        price.billing_interval = price_data.billing_interval
    if price_data.price is not None:
        price.price = price_data.price
    if price_data.is_active is not None:
        price.is_active = price_data.is_active
    
    db.commit()
    db.refresh(price)
    return PricingPlanCountryPriceResponse.from_orm(price)


@router.delete("/country-prices/{price_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_country_price(
    price_id: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a country price."""
    try:
        price_uuid = UUID(price_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid price ID format"
        )
    
    price = db.query(PricingPlanCountryPrice).filter(PricingPlanCountryPrice.id == price_uuid).first()
    if not price:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Country price not found"
        )
    
    db.delete(price)
    db.commit()
    return None


# ==================== APP SETTINGS ====================

@router.get("/app-settings", response_model=List[AppSettingResponse])
async def list_app_settings(
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """List all app settings."""
    settings = db.query(AppSetting).order_by(AppSetting.key).all()
    return [AppSettingResponse.from_orm(s) for s in settings]


@router.get("/app-settings/{key}", response_model=AppSettingResponse)
async def get_app_setting(
    key: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get a specific app setting by key."""
    setting = db.query(AppSetting).filter(AppSetting.key == key).first()
    if not setting:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="App setting not found"
        )
    
    return AppSettingResponse.from_orm(setting)


@router.post("/app-settings", response_model=AppSettingResponse, status_code=status.HTTP_201_CREATED)
async def create_app_setting(
    setting_data: AppSettingCreate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new app setting."""
    # Check if key already exists
    existing = db.query(AppSetting).filter(AppSetting.key == setting_data.key).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"App setting with key '{setting_data.key}' already exists"
        )
    
    setting = AppSetting(
        key=setting_data.key,
        value=setting_data.value,
        description=setting_data.description,
        is_public=setting_data.is_public,
    )
    db.add(setting)
    db.commit()
    db.refresh(setting)
    return AppSettingResponse.from_orm(setting)


@router.patch("/app-settings/{key}", response_model=AppSettingResponse)
async def update_app_setting(
    key: str,
    setting_data: AppSettingUpdate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Update an app setting."""
    setting = db.query(AppSetting).filter(AppSetting.key == key).first()
    if not setting:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="App setting not found"
        )
    
    # Update fields
    if setting_data.value is not None:
        setting.value = setting_data.value
    if setting_data.description is not None:
        setting.description = setting_data.description
    if setting_data.is_public is not None:
        setting.is_public = setting_data.is_public
    
    db.commit()
    db.refresh(setting)
    return AppSettingResponse.from_orm(setting)


@router.delete("/app-settings/{key}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_app_setting(
    key: str,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Delete an app setting."""
    setting = db.query(AppSetting).filter(AppSetting.key == key).first()
    if not setting:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="App setting not found"
        )
    
    db.delete(setting)
    db.commit()
    return None

