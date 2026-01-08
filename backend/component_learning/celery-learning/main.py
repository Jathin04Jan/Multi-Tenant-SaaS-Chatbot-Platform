from tasks import process


if __name__ == '__main__':

    while True:
        command = input("type START to start the process and END to kill everything : ")
        if command.lower() == "start":
            result = process.delay(1, 2)
            print(result)
        elif command.lower() == "end":
            break