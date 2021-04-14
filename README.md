# HW 1

## Apache Server Grader credentials: 
Username: grader
Password: ucsdgradercse135

## Domain Site: www.elks.codes 

## Details of GitHub Auto Deploy SetUp 
We used GitHub Actions to automatically pull the latest commit from the main branch of the repo whenever there is a successful commit to the main branch. 

After the commit to main is detected, GitHub Actions spins up a service which ssh into our droplet, which then checks out the latest version of main. 

## Username Password for Logging into the Site 
Username: grader
Password: grader

## Summary of Changes to HTML in DevTools after compression 
We used apache's mod deflate module to compress the HTML, CSS, and Javascript files. 
The configuration was set up in /etc/apache2/mods-enabled/deflate.conf

We installed deflate using this command: sudo a2enmod deflate
Then, we restarted Apache Server to update the changes: sudo service apache2 restart

Then, by opening developer tools in Firefox and looking at the network tab, we can see that the number of bytes transferred is smaller than the actual size of the resource, thus indicating successful compression. 

## Summary of Removing 'Server' Header
We initially tried using the apache module mod header to modify the 'server' header, but that didn't work. 

However, we succeeded by using ModSecurity. First, we installed it using: sudo apt-get install libapache2-mod-security2 

Then, we modified the Apache config file (/etc/apache2/apache2.con)  to change the value of "Server" header to "CSE135 Server".  


### Modifying HTTP Header Server
```
<IfModule security2_module>
    SecRuleEngine on
    ServerTokens Min
    SecServerSignature "CSE135 Server"
</IfModule>
``` 


