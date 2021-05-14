#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv, char **envp)
{
    // Headers
    printf("Cache-Control: no-cache\n");
    printf("Set-Cookie: destroyed\n");
    printf("Content-type: text/html\n\n");

    // Body - HTML
    printf("<html>");
    printf("<head><title>C Session Destroyed</title>");

    printf("<script type=\"module\" src=\"../scripts/collector.js\"></script>");

    printf("</head><body>");

    printf("<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">");

    printf("<h1>C Session Destroyed</h1>");

    // Links
    printf("<a href=\"/cgi-bin/c-sessions-1.cgi\">Back to Page 1</a>");
    printf("<br />");
    printf("<a href=\"/cgi-bin/c-sessions-2.cgi\">Back to Page 2</a>");
    printf("<br />");
    printf("<a href=\"../hw2/c-cgiform.html\">C CGI Form</a>");

    printf("</body>");
    printf("</html>");

    return 0;
}