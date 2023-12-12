nginx -s stop

rm -f ./error.log
nginx -c `pwd`/rc.conf -e `pwd`/error.log

tail -f ./error.log
