import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import {
  adminSubscriptionsApi,
  adminEntitlementsApi,
  adminCountryPricesApi,
  adminAppSettingsApi,
  type Subscription,
  type Entitlement,
  type CountryPrice,
  type AppSetting,
} from "@/lib/adminApi";

export default function DeveloperMode() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Developer Mode</h2>
        <p className="text-sm text-muted-foreground">
          Manage master tables: Subscriptions, Entitlements, Country Prices, and App Settings
        </p>
      </div>

      <Tabs defaultValue="subscriptions" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="entitlements">Entitlements</TabsTrigger>
          <TabsTrigger value="country-prices">Country Prices</TabsTrigger>
          <TabsTrigger value="app-settings">App Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <SubscriptionsTab />
        </TabsContent>

        <TabsContent value="entitlements">
          <EntitlementsTab />
        </TabsContent>

        <TabsContent value="country-prices">
          <CountryPricesTab />
        </TabsContent>

        <TabsContent value="app-settings">
          <AppSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ==================== SUBSCRIPTIONS TAB ====================

function SubscriptionsTab() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_highlighted: false,
    support_level: "",
    features: [] as string[],
  });
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function loadSubscriptions() {
    try {
      setLoading(true);
      const data = await adminSubscriptionsApi.list();
      setSubscriptions(data);
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
      alert("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditing("new");
    setFormData({
      name: "",
      description: "",
      is_highlighted: false,
      support_level: "",
      features: [],
    });
    setNewFeature("");
  }

  function startEdit(sub: Subscription) {
    setEditing(sub.id);
    setFormData({
      name: sub.name,
      description: sub.description || "",
      is_highlighted: sub.is_highlighted,
      support_level: sub.support_level || "",
      features: sub.features || [],
    });
    setNewFeature("");
  }

  function addFeature() {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  }

  function removeFeature(index: number) {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editing === "new") {
        await adminSubscriptionsApi.create({
          name: formData.name,
          description: formData.description || null,
          is_highlighted: formData.is_highlighted,
          support_level: formData.support_level || null,
          features: formData.features.length > 0 ? formData.features : null,
        });
      } else {
        await adminSubscriptionsApi.update(editing, {
          name: formData.name,
          description: formData.description || null,
          is_highlighted: formData.is_highlighted,
          support_level: formData.support_level || null,
          features: formData.features.length > 0 ? formData.features : null,
        });
      }

      setEditing(null);
      loadSubscriptions();
    } catch (error: any) {
      alert(error.message || "Failed to save subscription");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this subscription?")) return;
    try {
      await adminSubscriptionsApi.delete(id);
      loadSubscriptions();
    } catch (error: any) {
      alert(error.message || "Failed to delete subscription");
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Subscription Plans</h3>
        {!editing && <Button onClick={startCreate}>Create Subscription</Button>}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="admin-card p-4 rounded-xl space-y-4">
          <h4 className="font-semibold">{editing === "new" ? "Create" : "Edit"} Subscription</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Support Level</label>
              <Input
                value={formData.support_level}
                onChange={(e) => setFormData({ ...formData, support_level: e.target.value })}
                placeholder="e.g., email, priority"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Plan description"
              />
            </div>

            {/* Features Section */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Features</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    placeholder="Enter a feature and press Enter or click Add"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFeature}
                    disabled={!newFeature.trim()}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
                {formData.features.length > 0 && (
                  <div className="space-y-2 p-3 border rounded-md bg-muted/50">
                    {formData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-background rounded border"
                      >
                        <span className="text-sm">{feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_highlighted}
                onCheckedChange={(checked) => setFormData({ ...formData, is_highlighted: checked })}
              />
              <label className="text-sm font-medium">Highlighted (Most Popular)</label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Highlighted</TableHead>
              <TableHead>Support</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">{sub.name}</TableCell>
                <TableCell>{sub.description || "-"}</TableCell>
                <TableCell>
                  {sub.is_highlighted && <Badge>Popular</Badge>}
                </TableCell>
                <TableCell>{sub.support_level || "-"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(sub)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(sub.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ==================== ENTITLEMENTS TAB ====================

function EntitlementsTab() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "file" as "file" | "chat" | "other",
    entitlement: "",
    customEntitlement: "", // For "other" option
    unit: "",
    customUnit: "", // For "other" option
    quota: 0,
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    if (selectedSubscription) {
      loadEntitlements();
    }
  }, [selectedSubscription]);

  async function loadSubscriptions() {
    try {
      const data = await adminSubscriptionsApi.list();
      setSubscriptions(data);
      if (data.length > 0 && !selectedSubscription) {
        setSelectedSubscription(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
    }
  }

  async function loadEntitlements() {
    if (!selectedSubscription) return;
    try {
      setLoading(true);
      const data = await adminEntitlementsApi.list(selectedSubscription);
      setEntitlements(data);
    } catch (error) {
      console.error("Failed to load entitlements:", error);
      alert("Failed to load entitlements");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditing("new");
    setFormData({
      category: "file",
      entitlement: "",
      customEntitlement: "",
      unit: "",
      customUnit: "",
      quota: 0,
    });
  }

  function startEdit(ent: Entitlement) {
    setEditing(ent.id);
    // Check if entitlement is one of the predefined options
    const predefinedEntitlements = ["file_storage", "file_count", "tokens"];
    const isPredefinedEntitlement = predefinedEntitlements.includes(ent.entitlement);
    
    // Check if unit is one of the predefined options
    const predefinedUnits = ["MB", "Count"];
    const isPredefinedUnit = predefinedUnits.includes(ent.unit);
    
    setFormData({
      category: ent.category,
      entitlement: isPredefinedEntitlement ? ent.entitlement : "other",
      customEntitlement: isPredefinedEntitlement ? "" : ent.entitlement,
      unit: isPredefinedUnit ? ent.unit : "other",
      customUnit: isPredefinedUnit ? "" : ent.unit,
      quota: ent.quota,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSubscription) return;
    
    // Determine the actual entitlement value
    const actualEntitlement = formData.entitlement === "other" 
      ? formData.customEntitlement.trim() 
      : formData.entitlement;
    
    // Determine the actual unit value
    const actualUnit = formData.unit === "other" 
      ? formData.customUnit.trim() 
      : formData.unit;
    
    if (!actualEntitlement) {
      alert("Please enter an entitlement value");
      return;
    }
    
    if (!actualUnit) {
      alert("Please enter a unit value");
      return;
    }
    
    try {
      const submitData = {
        category: formData.category,
        entitlement: actualEntitlement,
        unit: actualUnit,
        quota: formData.quota,
      };
      
      if (editing === "new") {
        await adminEntitlementsApi.create(selectedSubscription, submitData);
      } else {
        await adminEntitlementsApi.update(editing, submitData);
      }
      setEditing(null);
      loadEntitlements();
    } catch (error: any) {
      alert(error.message || "Failed to save entitlement");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this entitlement?")) return;
    try {
      await adminEntitlementsApi.delete(id);
      loadEntitlements();
    } catch (error: any) {
      alert(error.message || "Failed to delete entitlement");
    }
  }

  if (loading && !selectedSubscription) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Entitlements</h3>
        {!editing && (
          <div className="flex gap-2">
            <select
              className="border rounded-md px-3 py-2"
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
            >
              {subscriptions.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
            <Button onClick={startCreate} disabled={!selectedSubscription}>
              Create Entitlement
            </Button>
          </div>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="admin-card p-4 rounded-xl space-y-4">
          <h4 className="font-semibold">{editing === "new" ? "Create" : "Edit"} Entitlement</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="category-select">Category *</label>
              <select
                id="category-select"
                className="w-full border rounded-md px-3 py-2"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                required
                aria-label="Select entitlement category"
              >
                <option value="file">File</option>
                <option value="chat">Chat</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="entitlement-select">Entitlement *</label>
              <select
                id="entitlement-select"
                className="w-full border rounded-md px-3 py-2 bg-background text-sm"
                value={formData.entitlement}
                onChange={(e) => setFormData({ ...formData, entitlement: e.target.value, customEntitlement: "" })}
                required
                aria-label="Select entitlement type"
              >
                <option value="">Select entitlement...</option>
                <option value="file_storage">File Storage</option>
                <option value="file_count">File Count</option>
                <option value="tokens">Tokens</option>
                <option value="other">Other</option>
              </select>
              {formData.entitlement === "other" && (
                <Input
                  className="mt-2"
                  value={formData.customEntitlement}
                  onChange={(e) => setFormData({ ...formData, customEntitlement: e.target.value })}
                  placeholder="Enter custom entitlement name"
                  required
                  aria-label="Custom entitlement name"
                />
              )}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="unit-select">Unit *</label>
              <select
                id="unit-select"
                className="w-full border rounded-md px-3 py-2 bg-background text-sm"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value, customUnit: "" })}
                required
                aria-label="Select unit type"
              >
                <option value="">Select unit...</option>
                <option value="MB">MB</option>
                <option value="Count">Count</option>
                <option value="other">Other</option>
              </select>
              {formData.unit === "other" && (
                <Input
                  className="mt-2"
                  value={formData.customUnit}
                  onChange={(e) => setFormData({ ...formData, customUnit: e.target.value })}
                  placeholder="Enter custom unit name"
                  required
                  aria-label="Custom unit name"
                />
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Quota *</label>
              <Input
                type="number"
                value={formData.quota}
                onChange={(e) => setFormData({ ...formData, quota: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {selectedSubscription && (
        <div className="border rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Entitlement</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Quota</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entitlements.map((ent) => (
                <TableRow key={ent.id}>
                  <TableCell>
                    <Badge>{ent.category}</Badge>
                  </TableCell>
                  <TableCell>{ent.entitlement}</TableCell>
                  <TableCell>{ent.unit}</TableCell>
                  <TableCell>{ent.quota.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(ent)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(ent.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ==================== COUNTRY PRICES TAB ====================

function CountryPricesTab() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [prices, setPrices] = useState<CountryPrice[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    country_code: "",
    currency: "",
    billing_interval: "monthly",
    price: 0,
    is_active: true,
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    if (selectedSubscription) {
      loadPrices();
    }
  }, [selectedSubscription]);

  async function loadSubscriptions() {
    try {
      const data = await adminSubscriptionsApi.list();
      setSubscriptions(data);
      if (data.length > 0 && !selectedSubscription) {
        setSelectedSubscription(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
    }
  }

  async function loadPrices() {
    if (!selectedSubscription) return;
    try {
      setLoading(true);
      const data = await adminCountryPricesApi.list(selectedSubscription);
      setPrices(data);
    } catch (error) {
      console.error("Failed to load prices:", error);
      alert("Failed to load prices");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditing("new");
    setFormData({
      country_code: "",
      currency: "",
      billing_interval: "monthly",
      price: 0,
      is_active: true,
    });
  }

  function startEdit(price: CountryPrice) {
    setEditing(price.id);
    setFormData({
      country_code: price.country_code,
      currency: price.currency,
      billing_interval: price.billing_interval,
      price: price.price,
      is_active: price.is_active,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSubscription) return;
    try {
      if (editing === "new") {
        await adminCountryPricesApi.create(selectedSubscription, formData);
      } else {
        await adminCountryPricesApi.update(editing, formData);
      }
      setEditing(null);
      loadPrices();
    } catch (error: any) {
      alert(error.message || "Failed to save price");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this price?")) return;
    try {
      await adminCountryPricesApi.delete(id);
      loadPrices();
    } catch (error: any) {
      alert(error.message || "Failed to delete price");
    }
  }

  if (loading && !selectedSubscription) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Country Prices</h3>
        {!editing && (
          <div className="flex gap-2">
            <select
              className="border rounded-md px-3 py-2"
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
            >
              {subscriptions.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
            <Button onClick={startCreate} disabled={!selectedSubscription}>
              Create Price
            </Button>
          </div>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="admin-card p-4 rounded-xl space-y-4">
          <h4 className="font-semibold">{editing === "new" ? "Create" : "Edit"} Country Price</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Country Code *</label>
              <Input
                value={formData.country_code}
                onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                placeholder="e.g., US, GB, IN"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Currency *</label>
              <Input
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                placeholder="e.g., USD, GBP, INR"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Billing Interval *</label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={formData.billing_interval}
                onChange={(e) => setFormData({ ...formData, billing_interval: e.target.value })}
                required
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Price (cents) *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <label className="text-sm font-medium">Active</label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {selectedSubscription && (
        <div className="border rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Interval</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((price) => (
                <TableRow key={price.id}>
                  <TableCell>{price.country_code}</TableCell>
                  <TableCell>{price.currency}</TableCell>
                  <TableCell>{price.billing_interval}</TableCell>
                  <TableCell>{(price.price / 100).toFixed(2)} {price.currency}</TableCell>
                  <TableCell>
                    {price.is_active ? <Badge>Active</Badge> : <Badge variant="outline">Inactive</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(price)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(price.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ==================== APP SETTINGS TAB ====================

function AppSettingsTab() {
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    key: "",
    value: "",
    description: "",
    is_public: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await adminAppSettingsApi.list();
      setSettings(data);
    } catch (error) {
      console.error("Failed to load settings:", error);
      alert("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditing("new");
    setFormData({
      key: "",
      value: "",
      description: "",
      is_public: false,
    });
  }

  function startEdit(setting: AppSetting) {
    setEditing(setting.key);
    setFormData({
      key: setting.key,
      value: typeof setting.value === "string" ? setting.value : JSON.stringify(setting.value, null, 2),
      description: setting.description || "",
      is_public: setting.is_public,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      let parsedValue: any = formData.value;
      try {
        parsedValue = JSON.parse(formData.value);
      } catch {
        // If not valid JSON, use as string
      }

      if (editing === "new") {
        await adminAppSettingsApi.create({
          key: formData.key,
          value: parsedValue,
          description: formData.description || null,
          is_public: formData.is_public,
        });
      } else {
        await adminAppSettingsApi.update(editing, {
          value: parsedValue,
          description: formData.description || null,
          is_public: formData.is_public,
        });
      }

      setEditing(null);
      loadSettings();
    } catch (error: any) {
      alert(error.message || "Failed to save setting");
    }
  }

  async function handleDelete(key: string) {
    if (!confirm("Are you sure you want to delete this setting?")) return;
    try {
      await adminAppSettingsApi.delete(key);
      loadSettings();
    } catch (error: any) {
      alert(error.message || "Failed to delete setting");
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">App Settings</h3>
        {!editing && <Button onClick={startCreate}>Create Setting</Button>}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="admin-card p-4 rounded-xl space-y-4">
          <h4 className="font-semibold">{editing === "new" ? "Create" : "Edit"} App Setting</h4>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Key *</label>
              <Input
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                disabled={editing !== "new"}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Value (JSON or string) *</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 font-mono text-sm"
                rows={4}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_public}
                onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
              />
              <label className="text-sm font-medium">Public (exposed via public API)</label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Public</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.map((setting) => (
              <TableRow key={setting.key}>
                <TableCell className="font-mono text-xs">{setting.key}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {typeof setting.value === "string"
                    ? setting.value
                    : JSON.stringify(setting.value)}
                </TableCell>
                <TableCell>{setting.description || "-"}</TableCell>
                <TableCell>
                  {setting.is_public ? <Badge>Public</Badge> : <Badge variant="outline">Private</Badge>}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(setting)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(setting.key)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

