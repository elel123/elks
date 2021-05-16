#include "stdio.h"
#include "stdlib.h"

int main(int argc, char **argv, char **envp)
{
  // print HTML header	
  printf("Cache-Control: no-cache\n");
  printf("Content-type: text/html\n\n");
  printf("<html><head><title>Environment Variables</title>");
  
  printf("<script type=\"module\" src=\"../scripts/collector.js\"></script>");

  printf("</head><body>\
    <noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\"> \
	<h1 align=center>Environment Variables</h1> \
  	<hr/>\n");

  for (char **env = envp; *env != 0; env++)
  {
    char *thisEnv = *env;
    printf("%s\n<br/>", thisEnv);
  }

  // print HTML footer
  printf("</body></html>");
  return 0;
}