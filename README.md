SelfExJS
========

# npm install selfexjs

This is an experimental module. It contains one exported function pack(String). It takes
a string of HTML or unevaluated JavaScript, and can include inline CSS. The resulting
output, when included in a browser page, is a script which performs a document.write() of
the original contents of the input string, or a self extracting JavaScript.

It uses the LZW packer method from Rosetta Code (replacing one from www.whak.ca which had
been hacked to attempt to generate data in a pseudo document textarea mess). As a research
project on the possibilities of using this with node, there is no copyright issue. For
commercial server use, this may not be the case. But then again, you might just use the
compression middleware module off github. Which is why I went for a medium LZW with UTF-8
output (plenty left to compress), but for templating, a single dictionary entry affects
multiple locations on decompression. And makes a casual code crypt.

Added in a file cache server, which is simplistic. It does not handle file permissions.
Thus can be used to generate cache files from code which generates them.

TODO
====

* Template Engine (Send JSON ajaxy stylee)
* Cache Engine (Reduce server load via piping)
* Local Decompression Cache (localStorage HTML5) - less etc.
* Socket Data Live
* Page Locks and Authentication Transparency
* ... More
