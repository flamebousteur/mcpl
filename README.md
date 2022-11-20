# mcpl (minecraft preprocessing language)

mcpl looks like the c preprocessor with some minecraft specific features.

## Features
```c
// mcpl
// lines comments change to # comments
/*
block comments
change to
# comments
# comments
# and comments
*/

#include "path/to/file" // add file contents at the current position
                        // can include .mcfunction (don't need compilation)
                        //         and .mcpl (automatically compiled)
                        //         and .mcpllib (only preprocessors directives) (automatically compiled)
#include <predefined file> // same as #include "predefined file" but search in predefined paths

#define NAME value // define a constant
#define NAME(args...) code {args1} {args2} // define a macro (args are optional)
                                           // macros can use # and ## operators

#undef NAME // undefine a constant or macro

#if <condition> // if condition is true
#elif <condition> // else if <condition> is true
#else // else
#endif // end if

/* conditions:
def(< NAME >) // if NAME is defined
undef(< NAME >) // if NAME is not defined

< NAME | value > == < NAME | value > // if NAME or value is equal to NAME or value
< NAME | value > != < NAME | value > // if NAME or value is not equal to NAME or value
< NAME | value > < < NAME | value > // if NAME or value is less than NAME or value
< NAME | value > > < NAME | value > // if NAME or value is greater than NAME or value
< NAME | value > <= < NAME | value > // if NAME or value is less than or equal to NAME or value
< NAME | value > >= < NAME | value > // if NAME or value is greater than or equal to NAME or value

< condition > // if condition is true
! < condition > // if the condition is false
< condition > && < condition > // if both conditions are true
< condition > || < condition > // if one of the conditions is true

// conditions are NAME, value, or other conditions
// conditions can be surrounded by parenthesis to change the order of operations and to group conditions
*/

#error < message > // print an error message and stop compilation
#warning < message > // print a warning message
#message < message > // print a message

#pragma < directive > // execute a pragma directive
/* pragmas directives:
message < message > // print a message
warning < message > // print a warning message
error < message > // print an error message and stop compilation

MCPL vertion < version > // set the mcpl file version (default: the mcpl compiler version)
                         // can be used to make the file compatible with older versions of mcpl
MCPL use < mcpl file (.mcpl | .mcpllib: file extention not nessesary) > // use a predefined mcpl file
MCPL disable < mcpl file (.mcpl | .mcpllib: file extention not nessesary) > // disable a predefined mcpl file (some files are included by default)
MCPL disable all // disable all predefined mcpl files
MCPL noComment // don't add comments to the output

// pragmas directives can be used in mcpl files and mcpllib files
*/

#function NAME (args...) // used to create more complex macros (args are optional)
/*
 args can contain default values ex: (arg1 = 1)
 args can contain specific types ex: (arg1: int) (arg1: int = 1) (arg1: int | float) use the | operator to allow multiple types

 if the function is called without args the default values are used
 if the function is called with too many args an error is printed
 if the function is called with bad args types
    if an other function could be called with the args types
        the other function is called
    if any function could be called with the args types
        an error is printed
 */
code {args1} {args2} // code to execute
#endfunction
```

## mcpllib
mcpllib files are only preprocessor directives and are automatically compiled
> can be add with #include < file > or #pragma MCPL use < feature >

## predefined mcpllib files:
mcpllib/compiler.mcpllib (not complet)
> mcpl compiler directives (automatically included)

mcpllib/namespace.mcpllib (not implemented)
> namespace directives (automatically included and modified if compiled a full datapack folder)

mcpllib/utils.mcpllib (not implemented)
> utils directives (need to be included)

mcpllib/command.mcpllib (not complet)
> add command like macros (need to be included)

