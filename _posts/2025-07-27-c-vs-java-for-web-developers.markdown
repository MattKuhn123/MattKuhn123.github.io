---
layout: post
title:  "C# vs Java for web developers"
date:   2025-07-27 08:00:00 -0400
categories: c# java
---
# C\# vs Java for web developers (and .NET vs Spring)

Java and C\# are both great languages with great frameworks for web development. How do they compare for everyday use? Here are the top 5 key points that stick out to me:

1.  How they build http apis.
2.  How they write tests.
3.  How they interact with collections.
4.  How they handle nullability.
5.  How they structure projects.

## Building http apis

C\# and Java (rather, their foremost frameworks; ASP.NET and Spring) are similar in their approach to creating http apis. In order to declare an http endpoint, make a filter, or grab data from a request body, both languages use annotations on classes and methods and parameters. Let’s look at a standard implementation of an http controller in ASP.NET and Spring, and contrast it with Node/Express.

*Disclaimer; though it is possible to implement controllers and routes in more than one way in each language/framework, for the purposes of this article, we’ll explore the most common way.*

## Building http apis (code samples)

``` java
import org.springframework.web.bind.annotation.*;

@RestController("/My")
public class MyController {

 @PostMapping("/myPost")
 public String myPost(@RequestBody Map<String, String> requestBody) {
  // ...
 }
}

```

``` csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/My")]
public class MyController: ControllerBase
{
[HttpPost("/myPost")]
public string MyPost([FromBody] Dictionary<string, string> requestBody)
{
 // ...
}
}

```

``` javascript
const express = require('express');
const router = express.Router();
router.post('/My/myPost', (req, resp) => {
 // ...
});
module.exports = router;

```

## Testing

Both languages have excellent testing libraries. The code below is a parameterized integration test making sure of the existence of the “My/myPost” url and the non-existence of a “not/real” url. The tests, themselves, can be as short as one or two lines, thanks to all of the hard work that the libraries handle for us behind-the-scenes.

## Testing (code samples)

``` java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.*;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
class MyControllerTest {

@InjectMocks
MyController real;
MockMvc mock;

@BeforeEach
void setUp() { mock = MockMvcBuilders.standaloneSetup(real).build(); }

@ParameterizedTest
@CsvSource({"/My/myPost,200", "/not/real,404"})
void test_urls(String url, int xpctd) throws Exception {
mock.perform(post(url)).andExpect(status().is(xpctd)).andReturn();
}
}

```

``` csharp
using Microsoft.AspNetCore.Mvc.Testing;

public class MyControllerTest(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
[Theory]
[InlineData("My/myPost", 200)] [InlineData("not/real", 404)]
public async Task Test_Urls(string url, int xpctd)
{
var response = await factory.CreateClient().PostAsync(url, null);
Assert.Equal(((int) response.StatusCode), xpctd);
}
}

```

## Collection interaction

Each has native libraries for interacting with collections to do aggregations, filters, projections, and more.

For example; let’s say we have a collection of people who each have a name and age, and we want to be able to do two things with that collection:

1.  Get the average age of the people in that collection
2.  Query for a person by name

The native libraries in each language allow us to do these things pretty easily without needing to write a for-loop (those who know me know that I like to avoid for-loops when possible\!)

Java’s Stream API and C\#’s LINQ have similar means of calculating the average, but

## Collection interaction (code samples)

``` java
import java.util.Collection;
import java.util.Optional;

public class PersonCollection {
private final Collection<Person> ppl;
public PersonCollection(Collection<Person> ppl) {
this.ppl = ppl;
}

public int getAverageAge() {
int total = ppl.stream()
.reduce(0, (subttl, x) -> subttl + x.age(), Integer::sum);
return total / ppl.size();
}

public Optional<Person> query(String q) {
return ppl.stream().filter(x -> x.name().contains(q)).findFirst();
}
}

```

``` csharp
public class PersonCollection
{
private readonly IEnumerable<Person> Ppl;
public PersonCollection(params Person[] ppl)
{
Ppl = ppl;
}

public int GetAverageAge()
{
int total = Ppl.Sum(x => x.Age);
return total / Ppl.Count();
}

public Person? Query(string q)
{
return Ppl.FirstOrDefault(x => x.Name.IndexOf(q) > 0);
}
}

```

## Null handling

In C\#, to indicate that a variable may be null, we can place a **question mark** (?) after the type. This indicator pairs nicely with the null coalescing operator **double question mark** (??), which is an easy way for a developer to handle null values.

This is possible to do in Java as well by wrapping the type with an Optional\<T\>, which provides functions of its own to handle the nullability of a variable.

So, if we were to make an application (*a console application in this case, even though we are all web developers*) that allows a user to enter a search value to query for a person in our PersonCollection, we might need to handle null values if the query doesn’t find a person. Let’s take a look at how a PersonProgram might handle that situation.

## Null handling (code samples)

``` java
import java.util.Optional;

public class PersonProgram {
private final UserInterface ui;
public PersonProgram(UserInterface ui) { this.ui = ui; }

public void run(PersonCollection pc) {
ui.printf("Who would you like to search for?%n");
String q = ui.getInputFromUser();
ui.printf("Searching for: %s%n", q);
Optional<Person> p = pc.query(q); // null wrapped in Optional<T>
p.ifPresentOrElse(
x -> ui.printf(x + "%n"),
() -> ui.printf("Person not found %s%n", q)
);
}
}

```

``` csharp
public class PersonProgram(IUserInterface ui)
{
public void Run(PersonCollection pc)
{
ui.Print("Who would you like to search for?\n");
string q = ui.GetInputFromUser();
ui.Print($"Searching for: {q}");
Person? p = pc.Query(q); // null indicator with (?)
ui.Print(p?.ToString() ?? $"Person not found: {q}");
}
}

```

## Project structure

C\# applications can be configured to separate different aspects from each other (such as interfacing with a database or http.) You may want to do this to simplify the code by preventing the different types of logic from leaking into each other (although this isn’t necessary and has trade-offs of its own.) Projects that do this are said to have “onion architecture,” because of how they can be conceptualized as having layers (like an onion\!).

C\# “Solutions” are composed of “projects,” where each project can be arranged to depend on or to be agnostic of each other. Thus, the separation of concerns is enforced by how it compiles. It may be possible to do something similar in Java as well, but I’ve never seen it done, even in enterprise.

## Conclusion

In some important considerations of web development, C\# and Java offer similar development experiences. The fact that these two languages have independently appeared and adopt the same paradigms is a cool thing; like a confirmation that those paradigms are well-suited to the job. (*That, or they’re just copying each other’s notes\!*)

## Bonus extra topic: Cool language features

Java and C\# seem to also be continuing to evolve in the same direction and adopting similar features. Two of my favorites are Records
