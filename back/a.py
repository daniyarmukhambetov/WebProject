import sys
cnt = 0
while True:
    a = input()
    print(cnt)
    if cnt == 0:
        cnt += 1
        print("B8")
        sys.stdout.flush()
    elif cnt == 1:
        print("B1")
        cnt += 1
        sys.stdout.flush()
        print("<<считываете значение t>>")
        t = int(input())
        if(t == 1):
            print("<<завершаете программу, так как t = 1>>")
            sys.stdout.flush()
            break
    elif cnt == 2:
        cnt += 1
        print("G1")
        sys.stdout.flush()
        print("<<считываете значение t>>")
        sys.stdout.flush()
        t = int(input())
        if(t == 1):
            print("<<завершаете программу, так как t = 1>>")
            sys.stdout.flush()
            break
    elif cnt == 3:
        cnt += 1
        print("G7")
        sys.stdout.flush()
        print("<<считываете значение t>>")
        sys.stdout.flush()
        t = int(input())
        if(t == 1):
            print("<<завершаете программу, так как t = 1>>")
            sys.stdout.flush()
            break
    elif cnt == 4:
        cnt += 1
        print("H7")
        sys.stdout.flush()
        print("<<считываете значение t>>")
        sys.stdout.flush()
        t = int(input())
        if(t == 1):
            print("<<завершаете программу, так как t = 1>>")
            sys.stdout.flush()
            break
    elif cnt == 5:
        cnt += 1
        print("A7")
        sys.stdout.flush()
        print("<<считываете значение t>>")
        sys.stdout.flush()
        t = int(input())
        if(t == 1):
            print("<<завершаете программу, так как t = 1>>")
            sys.stdout.flush()
            break
    else:
        cnt += 1
        print("H7")
        sys.stdout.flush()
        print("<<считываете значение t>>")
        sys.stdout.flush()
        t = int(input())
        if(t == 1):
            print("<<завершаете программу, так как t = 1>>")
            sys.stdout.flush()
            break
    cnt += 1