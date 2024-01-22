BASEDIR=`pwd`/.reverse-proxy-testing

if [ -f "/usr/local/var/run/nginx.pid" ]; then
  echo Stopping nginx
  nginx -s stop
fi

rm -f $BASEDIR/error.log
echo Starting nginx
nginx -c $BASEDIR/rc.conf -e $BASEDIR/error.log

echo Visit http://localhost:8081/research/research-catalog

echo Tailing error log:
tail -f $BASEDIR/error.log
