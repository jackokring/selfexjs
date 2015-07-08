SelfExJS
========
This is an experimental module. It contains one exported function pack(String). It takes
a string of HTML or unevaluated JavaScript, and can include inline CSS. The resulting
output, when included in a browser page, is a script which performs a document.write() of
the original contents of the input string.

It uses the LZW packer method from www.whak.ca which has been hacked to generate data
in a pseudo document textarea. Plus removal of all non essential bumf. As a research
project on the possibilities of using this with node, there is no copyright issue. For
commercial server use, this may not be the case. But then again, you might just use the
compression middleware module off github.
