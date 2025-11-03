' inject_nav.vbs -- UTF-8 safe read/write, inserts page nav
Option Explicit
Dim f, content, lc, nav, pos, pos2, newc
If WScript.Arguments.Count < 1 Then WScript.Quit 1
f = WScript.Arguments(0
