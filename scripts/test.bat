@echo off

set mode=comp
set game=t6
set platform=pc
set target=_test.gsc

cd scripts

gsc-tool %mode% %game% %platform% %target%
