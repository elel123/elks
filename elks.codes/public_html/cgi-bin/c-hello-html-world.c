#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void)
 {
 time_t t;
 time(&t);
  // Print HTML header
  printf("Cache-Control: no-cache\n");
  printf("Content-type: text/html\n\n");
  printf("<html><head><title>Hello CGI World</title> \
    <script type=\"module\" src=\"../scripts/collector.js\"></script> \
    </head><body> \
    <noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\"> \
	<h1 align=center>Hello HTML World</h1>\
  	<hr/>\n");

 printf("Hello World<br/>\n");
 printf("This program was generated at: %s\n<br/>", ctime(&t));
 printf("Your current IP address is: %s<br/>", getenv("REMOTE_ADDR"));
 
 // Print HTML footer
 printf("</body></html>");
 return 1;
 }