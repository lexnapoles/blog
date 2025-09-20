---
title: Testing and confidence in the front-end
slug: testing-and-confidence-in-the-front-end
description: >-
  Rethinking frontend testing: from obsessing over test types to focusing on
  user behavior and meaningful evidence.
tags: []
added: 2025-09-20T15:19:07.554Z
---

Confidence in the code and systems is one of the most important aspects in a software team, but often underestimated or set aside for more “valuable priorities”. It’s that significant that, in my last roles, improving the team’s confidence has been a big part of what I’ve done. Why? Because a fearful team can’t be at its best, nor can it be nimble, healthy, or adaptable.

Fear is not an ideal driving force. It causes avoidance behaviours, pushes us to get away, creates a vicious cycle and erodes the developer's spirit and self-confidence. The vicious cycle will only make the feedback loop longer, reinforcing the behaviours:

* Fewer and bigger releases
* Long-lived branches
* Release freezes
* More gates
* More manual testing

With a longer feedback loop, there will be delayed discovery of defects, high rework, lack of visibility… The team can’t sense and respond fast enough, there’s a big delay between action and consequence.

What if we could get near instant feedback on everything we do? We could discover if something goes wrong as we’re building it, if a bug appears as soon as the code goes live or if we’re not aligned in our understanding of the work, and adapt. We might sense that our solution won’t solve the customer’s opportunity before starting to build it, or that we need to change direction without having invested lots of money and time. With near instant feedback, we could refactor bravely, and make deploying at any time safer.

What if we could, when things go wrong—and they will—, know about it as soon as they happen, investigate with ease, have means to recover? No matter how great our process and code is, failure will always be an option, and fear of incidents will appear if we don’t embrace the possibility of failure and be ready for it.

From an engineering perspective, we want to build guard rails and shorten the feedback loop, which reduces fear, increasing safety.

> If it hurts, do it more frequently, and bring the pain forward. \
> \
> — Jez Humble, Continuous Delivery

In the past years, I’ve focused a lot on two areas: observability and testing.

Adding observability (nowadays known as observability 2.0) is a game changer, as it allows the team to see what’s going on under the hood of the system and understand it, shining light to a previously dark universe. Specially in these times of microservices and ever complex systems, observability is a must; otherwise you can’t really understand what’s going on. When the team makes instrumenting the code as they build it a habit, and starts seeing the value of it and how they can get fast feedback—as the code is built and all the way to production—, safety improves.

In terms of testing, from my experience, many teams don’t test much, if at all, and when they do, they have trouble writing tests that are reliable, fast and more importantly, that give them good confidence.

It’s not that the team doesn’t actively want to test, there are challenges that make it difficult to do so. One of them is the lack of knowledge and practice, and creating spaces to learn and get better together is paramount, even if it’s not “officially sanctioned”—being that the default in many places is to never encourage learning. Pairing or mobbing on a new test or a refactor and going through it together can be quite useful, as well as making things explicit and organizing internal workshops, or having learning time.

Encouraging the team to test or improve the way they do it is a gateway drug to quality and safety. You can’t have Continuous Delivery without continuous testing.

## Testing

When improving the testing experience and testing in general, there are two main aspects I’m looking for: confidence and friction.

### Friction

Friction refers to how easy or difficult it is to write and run tests. The lower the friction, the higher the probability of developers actually testing. Plenty of us have experienced a situation when writing a test is an obstacle race, having to jump through hoops to come up with something decent. The easiest path is to do the wrong thing, or to skip the test altogether.

When dealing with friction, I want to create a pit of success, a clear path that allows developers to write good tests by default:

> The Pit of Success: in stark contrast to a summit, a peak, or a journey across a desert to find victory through many trials and surprises, we want our customers to simply fall into winning practices by using our platform and frameworks. To the extent that we make it easy to get into trouble, we fail. \
> \
> —[The Pit of Success](https://ricomariani.medium.com/the-pit-of-success-cfefc6cb64c8), Rico Mariani

While there are numerous things that can reduce friction that we can tackle, the number one cause is often the system itself. In that case, making the system more testable over time by continuously refactoring and improving the architecture is a priority.

Low-hanging fruits can simply be things like updating libraries to the latest version possible, migrating to modern tooling that encourages better practices or simplifies areas like mocking, adding linting to tests to catch common mistakes… For example, in the front-end, migrating from enzyme to [testing-library](https://testing-library.com/), and using [Mock Service Worker](https://mswjs.io/) to improve the mocking experience, while relatively simple, can reduce friction and make testing better for developers.

An example of reducing friction is simplifying async state management. Lots of complexity in the front-end comes from state management and, in particular, dealing with server state. Fetching, pagination, rendering based on state (loading, error…), optimistic updates, cache, etc. If we’re not careful and venture to build those features from scratch, we might end up in a world of pain. Using solutions like TanStack Query, Apollo or similar for async state management can simplify the developer’s life.

## Confidence

Confidence in our code is paramount, I don't mean it in the narrow sense of just looking at the code and thinking that's good, or writing a simple automated test and moving on. Confidence goes beyond the code and the developer, it includes reducing uncertainty, driving out fear, reducing feedback loops—as mentioned in [part one](https://buttondown.email/lexnapoles/archive/en-60-testing-and-confidence-in-the-front-end-i-9606/)—and understanding the impact of the code on the people that'll use it.

If you were to push a code change straight to production, how would you feel? How you feel at that moment is tied to safety and confidence. Does the code behave the way it should? Will it break production or introduce bugs the second it’s live? How would I even know if something has gone wrong, do I have to wait for a customer to report it three months later? When things go wrong, do I have the proper support? Fear creeps if we don’t have a way to answer these questions and get fast feedback. If it hurts, we should bring the pain forward and do it more often.

The feeling of pushing changes without fear and frequently to production, any time of the week, getting fast feedback and observing how it behaves live, it’s priceless. We’re quick but under control, balanced.

When thinking about testing, I'd like to echo a Dan North's thought-provoking article, “[We need to talk about testing](https://dannorth.net/we-need-to-talk-about-testing/)”, where testing is described as the following:

> The purpose of testing is to **increase confidence** for **stakeholders** through **evidence**.You are testing **if and only if** you are increasing confidence for stakeholders through evidence.

From the definition, it follows that automated tests are not all there is testing. Nevertheless, they’re an important piece.

## Automated tests

![A pyramid divided in three sections, from the bottom to the top: unit, integration, e2e. At the side of the pyramid, three arrows going up. First arrow, indicates that as we go up in the pyramid tests get more expensive, second arrow indicates that as we go up we get more ROI and closer to the user, and third arrow indicates that as we go up in the pyramid tests get slower](/assets/typical-testing-pyramid.png)

At some point in a developer's life, we've all seen this type of picture about tests, sometimes it's a pyramid, sometimes a blob, a honeycomb, or a [trophy](https://kentcdodds.com/blog/write-tests). Regardless of the shape, the general idea is that the closer we get to the user and to the real thing, the better the assurance that things work, but the slower, costly and flaky the tests are. These images are used to indicate the amount of effort we should dedicate to each test.

Looking at the trade-offs, integration tests give the most Return on Investment, as they’re in the sweet spot between cost, speed, and confidence. In the pyramid above, I made the integration tests area bigger (a la testing trophy), as to indicate that we might want to prioritize these tests given the ROI.

### The uncertain nature of words like unit and integration

Now that I’ve shown you a testing pyramid, I’ve backed myself into a corner, but here’s also an opportunity to explore why.

Some writers argue that the pyramid isn't a good test distribution, preferring more integration tests and few unit tests. But the difference is probably illusory due to different definitions of “unit test”. See [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html) by Martin Fowler.

Things get fuzzy when we use words like unit and integration. In many conversations I’ve had with teammates about tests, we were rarely aligned on what a unit or integration test were.

Everyone agrees that an integration test involves testing the integration between things (and, specially, if it's testing the interaction between systems), but, when does a unit test become an integration test, where’s the boundary? Is a unit test only about testing one single thing in isolation? If it isn’t, how many more “units” it needs to level up to an integration test? Some devs call certain types of tests—specially if you think about some front-end tests—integration tests, while others would say that those tests are just chunky unit tests.

I’d rather bypass these questions, avoid giving a definition for the words or debating what the definitions are, spending hours debating the percentage of tests we should do, as I agree with Justin Searls when he [writes](https://x.com/searls/status/1393385209089990659):

> People love debating what percentage of which type of tests to write, but it's a distraction. Nearly zero teams write expressive tests that establish clear boundaries, run quickly & reliably, and only fail for useful reasons. Focus on that instead.

At this point, I would be remiss if I didn't mention Martin Fowler's article “[On the Diverse And Fantastical Shapes of Testing](https://martinfowler.com/articles/2021-test-shapes.html)”, which clearly has influenced my thoughts on this matter. It does a better job at discussing the different shapes of testing and words like unit and integration.

Instead of thinking of where the boundary between a unit and an integration test is, I like to think about it in terms of sociable and solitary tests (see [Working Effectively with Unit Tests](https://leanpub.com/wewut) by Jay Fields):

![On the left, the picture shows sociable tests as a brown box (the unit under test) connected to two other brown boxes (units). Below it says often the tested unit relies on units to fulfill its behavior; On the right, the picture shows solitary tests as a box (the unit under test) that connects to two boxes that are transparent and with only dotted outlines, that act as test doubles for the real units. Below it says: some unit testers prefer to isolate the tested unit](</assets/sociable and solitary tests.png>)

As an end to this section, I find it interesting to go back and try to understand what the different kinds of tests are and their origin. I’m not going to write about it here too much, but will share a few articles by Martin Fowler in case you are, like me, curious about it:

* [Unit Test](https://martinfowler.com/bliki/UnitTest.html)
* [Integration Test](https://martinfowler.com/bliki/IntegrationTest.html)
* [End-to-end test](https://martinfowler.com/bliki/BroadStackTest.html)
* [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

From these articles, I infer that the testing shapes and people arguing for more integration tests over unit tests or vice versa in the front-end, are not that far off from one another.

Within the same system, we could consider integration tests unit tests and be done with it. Based on the test pyramid (including the one at the very top), we want to spend more effort writing unit tests. Every so often the unit tests will be sociable or solitary, chunkier or leaner, but if we write good tests, as James Searls described, we’ll be in a good direction. So, when I wrote that “integration tests give the most Return on Investment, as they’re in the sweet spot between cost, speed, and confidence”, you can replace “integration tests” with “unit tests” (but chunkier, sociable in the front end) and now the pyramid has a heavy unit tests base, a thinner layer of integration tests and an even thinner end-to-end layer at the top. In fact, I’ll be using this adapted understanding starting the next section.

## Testing recommendations

### More sociable tests

I’m more of a fan of doing more sociable tests in the front-end for confidence than solitary tests. **I would highly recommend writing more sociable tests in the front-end, where we mount the component (without stubbing the children) and test the way a user would interact with it**. This is because a complex UI will use many smaller components, and stubbing most of them will lead to tests that don’t tell you anything but the simplest things, and will often give you a false sense of safety.

It doesn’t mean that we cannot do solitary tests. We can, and should, for example, if testing composables/hooks, complex functions, etc.

A typical front-end solitary test will involve mounting the component shallowly, stubbing all the children, and asserting on some text, or checking a snapshot or even modifying internal state. With that kind of test, it’s not uncommon to see the sense of security crumble as soon as the code’s live. Someone reports a bug, and you wonder why it happened, discovering that the bug was hidden in plain sight in the interactions between children and parents that you never tested.

#### Focus on behaviour

Thinking about behaviour when testing is way more effective than thinking of what kind of test it is. Focusing on behaviour creates better tests and can make them more understandable and intentional. It doesn't matter what you call it, unit, integration or whatever, test the use cases your code is supposed to do, not the implementation detail. Think about writing tests that check that the valuable things the features should do happen ([BDD](https://dannorth.net/introducing-bdd/)/[Specification by Example](https://gojko.net/books/specification-by-example/)).

If a person needs to interact with the UI to accomplish their goals, test those interactions from the person’s perspective, and that the outcomes actually happen. If the business goes through certain flows and rules to satisfy the customer command, test those flows and rules, not the implementation details, and that the outcomes are achieved, all of that while using the business language.

A sign that a test might not be testing behaviour is that, every time we change the implementation of a component but not how it behaves, we have to go back and update all its tests.

### Test what you own, trust the platform

When testing, it can be tempting to start asserting what third-party libraries will do, or how the browser will behave.

Let the browser do what it does, and focus on what your code’s doing. As a simple example, if you’re asserting that the browser, when a user clicks on an a tag, they get redirected to a specific URL, you might be doing more than you should. If you care about the URL being correct, you can test your custom logic that builds it, or the href in the tag. If you have stuff that reacts to the URL change and want to verify that it works, test that.

The same principle applies to third-party libraries or systems. Don’t reach into the library to test how it behaves, test your code which will interact with the library.

For 3rd party systems, we have to be even more careful, since they’re over the network, and for speed and reliability, we want to replace them with test doubles in most cases. There are good reasons to have a few tests with the real thing, but normally, we should try to replace them.

### A hybrid approach to mocks: not too much, when they matter

By default, I try not to mock unless it’s awkward or needed for speed and reliability reasons or when I don’t control the code. Let’s jokingly call it “mocking at the edge”.

It means that, on one hand, for example, I’ll mock the network with a library like msw\.js, since I would rather not cross the network boundary and reach other systems. On the other hand, if I can pass a real store (e.g. redux) instance to a component, I rather do it.

### Don’t worry about test coverage

To pursue increasing the test coverage percentage won’t make the quality higher, you’ll just end up spending effort writing tests that give little to no confidence. Throw the metric away and prioritize writing tests that check behaviour and that are “expressive, that establish clear boundaries, run quickly & reliably, and only fail for useful reasons”.

### When the test fails, it provides useful information

Write tests that can give you good feedback when they fail, and you can tell easily what the failure was and why it failed. If a test didn’t succeed, and you’re devoting lots of time deciphering why, the test is a hindrance.

While this article is not about TDD, this talk by Ian Cooper always comes to mind when I think about unit testing, and I find it extremely insightful. Check it out for more recommendations and insights: [https://www.youtube.com/watch?v=EZ05e7EMOLM](https://www.youtube.com/watch?v=EZ05e7EMOLM)

### A balance diet of tests

To get a good level of confidence, we have to have a good mix of tests, covering different aspects. While writing more unit tests is the base, given the cost, speed and confidence trade-offs, we also want to expand our test suite, including integration, [contract](https://pactflow.io/blog/what-is-contract-testing/), and (some) end-to-end tests.

One of the instincts of teams that have fear and low confidence is that they go all in with end-to-end tests, writing tons of them for each flow, ignoring unit tests. These tests give them initial signals that they can catch bugs and regressions, as they’re as real as it gets, so they keep writing them. Sooner than later, the pains start:

* Lots of time maintaining tests, brittleness, and flakiness. When something changes in the entire flow, all tests in that flow have to change. Tests fail for random reasons (e.g. timeouts, etc.) and retrying them fixes them.
* The pipeline gets slower with every test. Longer time to get feedback.
* In a microservice architecture, having everything as real as possible can be complicated and brittle. Too many things need to work.

In that situation, what I recommend is to focus on moving tests “down the pyramid”, for example, by seeking opportunities to replace end-to-end tests with unit tests with similar confidence. Moreover, creating space and time to improve, as a team, the way they test, will help, as they might not have the practice of how to do better testing.

Another reason teams resort to end-to-end tests is to test that the interaction between the back-end and front-end works as expected, and that given a request from a client, the backend will respond in a certain way. For that reason, I’ve seen (and written in the past) end-to-end tests that assert that the request or the response have a specific shape or certain data. If we add end-to-end tests to check that the systems have a shared understanding of expectations, which is, again, expensive, slow and brittle, we can move them “down the pyramid” and turn them into contract tests, that are cheaper and faster.

There’s usually no need to have a massive suite of end-to-end tests for confidence if you have a good mix of unit, integration, and contract tests.
