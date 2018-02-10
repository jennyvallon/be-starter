#!/bin/bash
#start up mongod mongo
INDENT="start-db.sh   >>>   ";
MONGOD=null;
MONGOOSE=null;

case $1 in 
    #START
    "" )
        #MONGOD
        echo
        echo "$INDENT Checking if mongod process is running..." 
        if [ -z $(pgrep -f "mongod") ];
            then
                ./bin/db.sh -clean
                echo "$INDENT Starting mongod process..."
                nohup mongod >>./logs/mongod.log 2>&1 &
            else
                echo "$INDENT the following mongod process is already running"
        fi;
        MONGOD=`pgrep -f "mongod"`
        echo "$INDENT MONGOD PID = $MONGOD"
        
        #MONGOOSE
        echo
        echo "$INDENT Checking if mongoose connection is running..." 
        if [ -z $(pgrep -f "mongoose") ];
            then
                echo "$INDENT starting mongoose connection..."
                node mongoose >>./logs/mongoose.log 2>&1 &
            else
                echo "$INDENT the following mongoose process is already running"
        fi;
        MONGOOSE=`pgrep -f "mongoose"`
        echo "$INDENT MONGOOSE PID = $MONGOOSE"
        echo
        echo "$INDENT Start complete"
    ;;

    #EMPTY LOGS
    "-clean" )
        echo "$INDENT Cleaning mongod and mongoose logs"
        rm ./logs/mongod.log
        rm ./logs/mongoose.log
        echo "$INDENT -clean complete"
     ;;

    #KILL 
    "-kill" )
        if [ -z $(pgrep -f "mongod") ];
            then
                echo "$INDENT mongod process is not running"
            else    
                echo "$INDENT Begin killing mongod process"
                MONGOD=`pgrep -f "mongod"`
                kill $MONGOD;

        fi;

        if [ -z $(pgrep -f "mongoose") ];
            then
                echo "$INDENT mongoose process is not running"
            else    
                echo "$INDENT Begin killing mongoose processes"
                MONGOOSE=`pgrep -f "mongoose"`
                kill $MONGOOSE
        fi;
        
        echo "$INDENT -kill complete" 
    ;;

    #DEFAULT
    * )
        echo "$INDENT Usage: $ ./bin/start-db.sh -[flag]"
        echo "$INDENT Options: -kill    Kill mongod and mongoose connections"
        echo "$INDENT Options: -clean   clean db related logs"
    ;;
esac

echo "$INDENT Exiting..."
exit 0