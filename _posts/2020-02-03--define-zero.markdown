---
layout:	post
title:	"(define zero(….))"
date:	2020-02-03
hide_hero: true
tags: sicp, lisp, racket, programming
categories: programming
---

A couple weeks ago I had the opportunity to attend the [SICP](https://mitpress.mit.edu/sites/default/files/sicp/index.html) course taught by [David Beazley](https://www.dabeaz.com/sicp.html). I’ve written a short summary of my experience [here](https://burningdaylight.io/posts/sicp-beazley-review/) (tldr; take the course if you get the chance). While the course as a whole was challenging and an interesting a couple of the exercises stood out to me, and I wanted to take a moment to share them here.

### TRUE

At a deep level our computer is operating super fast on a state of ON/OFF with gates that define logic. Because of this it's an area of interest for me in how we express similar logic in our languages and the statement/operator capabilities we can build from that. Towards the beginning of day two we kicked things off by defining our own boolean logic in Racket. Our first step? Defining TRUE and FALSE.

```racket
(define (TRUE x y) x)  
(define (FALSE x y) y)(define t (TRUE 0 1))  
't  
(define f (FALSE 0 1))  
'fTake a minute and reread that block, because the first time I did it threw me for a loop. We just passed in the same arguments and got TRUE and FALSE. In Racket, and in this scenario we have defined the behavior of our basic TRUE and FALSE operators. The next challenge we were provided was to implement all boolean logic operators.

(define (NOT x) (x FALSE TRUE))(NOT TRUE)  
'f  
(NOT FALSE)  
't  
  
(define (AND x y) (x y x))  
(AND TRUE FALSE)  
't(define (OR x y) (x x y))  
(OR FALSE FALSE)  
'f  
(OR TRUE FALSE)  
't  
(OR FALSE TRUE)  
't*;;
```

Hint: x is not just TRUE/FLASE above. It is a procedure, it takes two arguments. And we now have our own set of truth tables.

### Defining Zero

Before working on boolean logic we had been discussing the substitution model of evaluation and what you could express with it. After our truth searching exercise it seemed like looking at how numbers could work might be fun.

```racket
(define zero (lambda (f) (lambda (x) x)))  
(define two (lambda (f) (lambda (x) (f (f x)))))  
(define three (lambda (f) (lambda (x) (f (f (f x))))))
```

Defining numbers as symbols for the application of a function N times then let us implement addition:

```racket
(define (plus a b)  
 (lambda (f) (lambda (x) ((a f) ((b f) x))))  
 )(define five (plus two three))
``` 

Or to make it concrete

```rackaet
(define (inc x) (+ x 1))((five inc) 0)  
'5
```

Numbers are weird and amazing. Ever since I realized that anything we can express in a program (that I’m writing in letters and symbols) can be boiled down to a series of 0s and 1s that were ultimately symbols that could be swapped out I’ve been captivated by the question of what numbers are. We did other interesting and exercises (mutation, building an interpreter, a register machine VM, and generic types), but something about the above left me considering the nature of logic and programming. It’s easy to get lost in the day to day problem solving, but when we get the chance to step back and look at the strangeness of what we are interacting with it can be a lot of fun. Here’s one last thought to have some fun with:

Always returns false, except for zero, because zero says don't do the function so we get back true  

```racket
(define (zero? n) ((n (lambda (x) #f)) #t))
```
