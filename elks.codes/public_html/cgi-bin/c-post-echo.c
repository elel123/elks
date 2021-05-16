#include "stdio.h"
#include "stdlib.h"

int main(int argc, char **argv, char **envp)
{
  char str[1000];
  // Print HTML header
  printf("Cache-Control: no-cache\n");
  printf("Content-type: text/html\n\n");
  printf("<html><head><title>POST Message Body</title> \
    <script type=\"module\" src=\"../scripts/collector.js\"></script> \
    </head>\
	<body><noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">\
    <h1 align=center>POST Message Body</h1>\
  	<hr/>\n");

  printf("Message Body: %s\n<br/>", fgets(str, 1000, stdin));

  // Print HTML footer
  printf("</body>");
  printf("</html>");
  return 0;
}