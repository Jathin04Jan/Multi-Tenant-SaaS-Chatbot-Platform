from time import sleep
from celery import Celery

# First separate Celery app for general tasks
app = Celery('celery-learning-1', broker='redis://localhost:6379')

@app.task
def process(a, b):
    i = 0
    while i < 10:
        sleep(1)
        i += 1
        print("processing task 1......")
    c = a + b
    result = subprocess("task - 1 ")
    return "given to subprocess 1"

def subprocess(task_name):
    print(f"subprocessing {task_name} task......")
    sleep(3)

@app.task
def process2(b, c):
    print("This is process 2")
    i = 0
    while i < 10:
        sleep(1)
        i += 1
        print("processing task 2......")
    result = subprocess("task - 2 ")
    return "given to subprocess 2"
    

if __name__ == '__main__':
    #result = process.delay(1, 2)
    process(1, 2)