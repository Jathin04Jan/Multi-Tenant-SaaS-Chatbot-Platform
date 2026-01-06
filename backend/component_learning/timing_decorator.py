"""
Timing decorator for measuring function execution time.
"""

import time
import functools
from typing import Callable, Any


def timing_decorator(display: bool = True, precision: int = 4) -> Callable:
    """
    Decorator to measure and display function execution time.
    
    Args:
        display: If True, prints the execution time. If False, stores it in function.__execution_time__
        precision: Number of decimal places for time display (default: 4)
    
    Usage:
        @timing_decorator()
        def my_function():
            # your code here
            pass
        
        @timing_decorator(display=False)
        def my_function():
            # execution time stored in my_function.__execution_time__
            pass
    """
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            start_time = time.time()
            try:
                result = func(*args, **kwargs)
                return result
            finally:
                end_time = time.time()
                execution_time = end_time - start_time
                
                if display:
                    func_name = func.__name__
                    print(f"[TIMING] {func_name}() executed in {execution_time:.{precision}f} seconds")
                else:
                    # Store execution time as function attribute
                    func.__execution_time__ = execution_time
        
        return wrapper
    return decorator


def timing_decorator_with_label(label: str = None, precision: int = 4) -> Callable:
    """
    Decorator to measure function execution time with a custom label.
    
    Args:
        label: Custom label to display (defaults to function name if not provided)
        precision: Number of decimal places for time display (default: 4)
    
    Usage:
        @timing_decorator_with_label("Document Loading")
        def load_document():
            # your code here
            pass
    """
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            start_time = time.time()
            try:
                result = func(*args, **kwargs)
                return result
            finally:
                end_time = time.time()
                execution_time = end_time - start_time
                
                display_label = label if label else func.__name__
                print(f"[TIMING] {display_label} executed in {execution_time:.{precision}f} seconds")
        
        return wrapper
    return decorator


class TimingContext:
    """
    Context manager for timing code blocks.
    
    Usage:
        with TimingContext("Loading PDF"):
            # your code here
            load_pdf()
    """
    
    def __init__(self, label: str = "Operation", precision: int = 4):
        self.label = label
        self.precision = precision
        self.start_time = None
        self.execution_time = None
    
    def __enter__(self):
        self.start_time = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        end_time = time.time()
        self.execution_time = end_time - self.start_time
        print(f"[TIMING] {self.label} executed in {self.execution_time:.{self.precision}f} seconds")
        return False

