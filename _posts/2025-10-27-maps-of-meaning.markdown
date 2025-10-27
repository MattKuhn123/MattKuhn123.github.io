---
layout: post
title:  "Maps of meaning"
date:   2025-10-27 08:00:00 -0400
categories: work
---
# Maps of meaning

## Maps

I don't *expect* to see `Map<String, Object>` around a codebase very often these days. *Maybe* around old school low-level code, like JDBC or HttpURLConnection code, or an implementation of some complicated formula. But *definitely* not in modern *application code* for a web application or web service. Developers generally model their data with domain objects or data transfer objects.

However, sometimes I still come across projects where `Maps` are used rampantly! Here's an example from my most recent project:

```java
@PostMapping("/...")
public ResponseEntity<Map<String, Object>> post(@RequestBody Map<String, Object> request) {
    Map<String, Object> input = (Map<String, Object) request.get("input");
    Map<String, Object> contract = (Map<String, Object>) input.get("contract");
    var result = handlePostContractRequest(contract);
    // ...
}
```

## Why do this?

1. It allows the application to be completely agnostic as to what data passes through it. Could be worthwhile in some situations, such as if the backend uses unstructured data storage.
2. It allows code to be more flexible, such as a single API endpoint that serves different clients with different request bodies.

## Why is it a problem?

1. You can't tell what data structure a `Map<String, Object>` has by just looking at it. 
2. The data hasn't been classified, so you can't easily see how it is used throughout the project. 
3. It's more difficult for developers to discover ways to improve the application based on what the code "speaks" to them (what Kent Beck calls "[The adjacent possible](https://medium.com/@kentbeck_7670/software-design-is-human-relationships-part-1-of-3-perspective-1bcd53855557).")
4. Modelling the data in a class cuts-down the amount of code that we need to write that *does stuff*. It increases the code's *signal-to-noise* ratio.
5. You have to write more tests to confirm that your Maps contain the structure of data you expect (which is something that *could* be confirmed *for* you at compile time).

## What can we do?

### The preferable option is to rip-off the band aid. 

If you know exactly what the shape of the data is, you can use IDE tools (for example IntelliJ's RoboPojoGenerator) to generate classes that model your data, then refactor everything associated with it.

If this is impossible to do all at once, there is another option.

### Another option is to make incremental changes

If you can't take on the refactor all at once, you can still incrementally implement a change that preserves all of the functionality and the flow of the current state of the code while giving yourself the classification you desire. 

You can create your own class that implements `Map`, and beef it up however you like.

I recommend creating abstract `MapWrapper` class that wraps around your normal `Map`. Then, you can make DTOs and Domain Objects that extend from MapWrapper, and include getters and setters to model the structure of the data.

``` java
public abstract class MapWrapper implements Map<String, Object> {
    public final Map<String, Object> innerMap;
    public MapWrapper(Map<String, Object> innerMap) {
        this.innerMap = innerMap;
    }

    @Override // pass-through to innerMap
    public void put(String key, Object value) { innerMap.put(key, value); }

    @Override // pass-through to innerMap
    public Object get(String key) { return innerMap.get(key); }

    @Override // pass-through to innerMap
    public boolean equals(Object other) { return innerMap.equals(other); }

    // ... override everything as pass-throughs to innerMap ...
}
```

``` java
public class ContractRequest extends MapWrapper {
    public Map<String, Object> getInput() {
        return (Map<String, Object>) this.get("input");
    }

    public Map<String, Object> getContract() {
        return (Map<String, Object>) this.getInput().get("contract");
    }
}
```

Here's how the Controller code looks now:

``` java
@PostMapping("/...")
public ResponseEntity<Map<String, Object>> post(@RequestBody ContractRequest request) {
    var result = handlePostContractRequest(request.getContract());
    // ...
}
```

## Conclusion

`MapWrapper` implements `Map`, so any method in your code that accepts a `Map` will also accept a `MapWrapper`. That means you can selectively update method parameters, method return types, local variables, and class-level variables from `Map` to `MapWrapper` wherever you would like *(wherever the ongoing project work is)*; and leave everything *else* intact. 

### Advantages

- You don't **have** to change *all* of the `Map`s to `MapWrapper`, so that spares you from having to touch fragile legacy code.
- You've taken another step closer to modelling the data.
- You can clear up application code that drills into maps and improve the signal-to-noise ratio.

### Disadvantages

- Your application is now *"in-between"* techniques of modelling, where *some* of the data is *somewhat* modelled and used in *some* parts of the code.
- This is a somewhat strange and confusing pattern to someone who hasn't seen it before. It is likely to be misunderstood and abused in ways that I could never imagine.

