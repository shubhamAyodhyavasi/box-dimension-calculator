# Box Dimension Calculator

An awesome package to calculate consignment’s dimension!

It helps user to calculate the dimension when shipping goods. User can get quick and easy calculation of what will be the dimension of the final shipping container.

Try it for yourself!


# Usage

Pass an array of objects in which each object will be consisting of keys l, h, w in which

> l Stands for Length
> 
> h stands for Height
> 
> w stands for Width

Duh!   

> let arrayOfObjects = [{l: 2, h:2, w:2},{l: 1, h:2, w:1}]

You have to pass the dimension of each box you are gonna pack in this array and leave the rest up to this package

> import {combineLoop} from “box-dimension-calculator”;
> 
> let dimension = combineLoop(arrayOfObjects);

Its easy peasy!


