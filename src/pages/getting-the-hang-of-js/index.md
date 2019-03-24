---
title: "Some learning lessons when moving to JavaScript"
description: Whilst the names are similar, there are some subtle differences.
date: "2019-03-23 15:00"
image: ""
tag: "tech"
---

Recently, I have been asked how I can "effortlessly" shift between Java and JavaScript (React). The truth is that I had to fail a bunch of times , stay patient and use Google efficiently.

However, I thought I would share a few of my gotchas for any newbies out there.

Generally speaking if you are decent in Java, moving to JavaScript shouldnt be too hard.You have the same logic statements, things are in fact a bit loser since Javascript isnt strongly typed.

## Not everything is synchronous.

In Java usually, you expect everything to be synchronous. You invoke a function and you expect it to complete before it heads to the next line. JavaScript however relies a lot on asynchronous code execution. Lets have an example snippet to better explain this.

```
class Counter extends React.Class{
    incrementCounter = () =>{
        this.setState({
            counter: counter+1
        })
        console.log(this.state.counter);
    }

    render(){
        <div>
            <div>{this.state.counter}</div>
            <Button onClick={this.incrementCounter}>Increase</Button>
        </div>
    }
}
```

setState however is an asynchronous function, and therefore the console.log statement wont print the updated counter, as you would usually expect. Therefore, to run anything in asynchronous functions you will notice that there is a way to provide a callback function that allows you to define what needs to be run.

Lets update our example code.

```
class Counter extends React.Class{
    incrementCounter = () =>{
        this.setState({
            counter: counter+1
        }, ()=>{
            //callback code here.
            console.log(this.state.counter);
        })
    }

    render(){
        <div>
            <div>{this.state.counter}</div>
            <Button onClick={this.incrementCounter}>Increase</Button>
        </div>
    }
}
```

## Return data in your promises.

Another gotcha is when you have promises you can chain callbacks together using .then . Here's a small snippet using the fetch function available in modern browsers.

```
fetch(url)
.then(response=>{
    return response.json();
}).then(responseJSON=>{
    //do something with this.
})
```

Now, if in the second callback you dont return anything it wont complain and you probably wont notice anything breaking, until you chain it further.

```
fetch(url)
.then(response=>{
    return response.json();
}).then(responseJSON=>{
    //do something with this.
}).then(data=>{
    console.log('data', data) //prints undefined.
})
```

At this point , I have seen myself an many others stumble, at why undefined is being returned. The reason being that you didnt return anything . Just return responseJSON before the .then(data), and it would work as expected.

I will keep adding more gotchas as I stumble upon them.
