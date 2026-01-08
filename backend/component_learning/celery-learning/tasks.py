from celery import Celery
from time import sleep

app = Celery('celery-learning', broker='redis://localhost:6379')

@app.task
def process(a, b):
    i = 0
    while i < 10:
        sleep(1)
        i += 1
        print("processing......")
    c = a + b
    result = subprocess(c)
    return "given to subprocess"

def subprocess(c):
    print("subprocessing......")
    sleep(2)
    return c + 2

if __name__ == '__main__':
    #result = process.delay(1, 2)
    process(1, 2)