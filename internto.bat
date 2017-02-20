
echo before
CMD /C npm run tsc

echo after
copy index.d.ts C:\xampp\htdocs\ng2-select2-bootstrap\docs\src\node_modules\ng2-select2-bootstrap
copy index.js C:\xampp\htdocs\ng2-select2-bootstrap\docs\src\node_modules\ng2-select2-bootstrap
copy index.js.map C:\xampp\htdocs\ng2-select2-bootstrap\docs\src\node_modules\ng2-select2-bootstrap
xcopy src C:\xampp\htdocs\ng2-select2-bootstrap\docs\src\node_modules\ng2-select2-bootstrap\src\ /y /s
