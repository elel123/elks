#!/usr/bin/perl

# The below line includes the CGI.pm Perl library
use CGI qw/:standard/;     

# CGI.pm Method
print "Cache-Control: no-cache\n";
print header;

# CGI.pm Method
print start_html("Environment Variables");

print "<script type=\"module\" src=\"../scripts/collector.js\"></script>";
print "<noscript><img src=\"../collector.php\"></noscript><img id=\"flag\" src=\"../images/favicon/favicon-16x16.png\" width=\"1px\" alt=\"\">";
print "<h1 align='center'>Environment Variables</h1><hr />";

# Loop through all of the environment variables, then print each variable and its value
foreach my $key (sort(keys(%ENV))) {
   print  "$key = $ENV{$key}<br />\n";
}

# CGI.pm method
print end_html;

