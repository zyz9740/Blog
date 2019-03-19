BASE_DIR=$HOME/Desktop/MyBlog

react_kit_dir=$BASE_DIR/React/src
django_pro_dir=$BASE_DIR/service/server
pro_name=server

dist_dir=$BASE_DIR/React/build

cp -rf $django_pro_dir/React/* $react_kit_dir/

cd $react_kit_dir/
npm run build

cp -f $dist_dir/*html  $django_pro_dir/templates/$pro_name
cp -rf $dist_dir/static/*  $django_pro_dir/static/

