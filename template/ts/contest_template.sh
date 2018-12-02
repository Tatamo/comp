cp -v `acc config-dir`/ts/package.json $CONTEST_DIR
cp -v `acc config-dir`/ts/package-lock.json $CONTEST_DIR
cp -v `acc config-dir`/ts/tsconfig.json $CONTEST_DIR
cp -v `acc config-dir`/ts/gitignore $CONTEST_DIR/.gitignore
cp -r `acc config-dir`/ts/node_modules $CONTEST_DIR

