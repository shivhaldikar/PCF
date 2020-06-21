pac solution init --publisher-name ACL --publisher-prefix acl
pac solution add-reference --path ../
msbuild /t:build /restore /p:configuration=Release