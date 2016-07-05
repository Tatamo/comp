#AC
import sys
import re
script = sys.stdin.readlines()

rule = {
    "digi":  "nyo",
    "petit": "nyu",
    "rabi": "",
    "gema": "gema",
    "piyo": "pyo"
}

not_kigou_re = re.compile("[0-9a-zA-Z]")

wrong = "WRONG!"
correct = "CORRECT (maybe)"

for line in script :
    line = line.rstrip("\n")
    flg = False
    for chara in rule :
        gobi = rule[chara]
        if(line.startswith(chara)) :
            flg = True
            line = line[len(chara):]
            if(len(line) == 0 or line[0] != " "):
                flg = False
                break
            #print "chara:",chara,"gobi:",gobi
            #print "line:" ,line
            #print "usiro:" ,line[:3+len(gobi)]
            if(chara == "rabi") :
                if(not_kigou_re.search(line) == None):
                    print wrong
                else:
                    print correct
            else :
                flg2 = False
                for x in range(4):
                    if(gobi == line[(len(gobi))*-1:].lower()):
                        flg2 = True
                        print correct
                        break
                    else:
                        if(not_kigou_re.match(line[-1:]) == None):
                            line = line[:-1]
                        else :
                            break
                if(not flg2):
                    print wrong
    if(not flg):
        print wrong
