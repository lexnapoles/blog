---
title: 'Deploying on Fridays, is it crazy?'
slug: deploying-on-fridays-is-it-crazy
description: >-
  My take on the Friday deployment debate. Exploring the real reasons behind
  deployment timing and what actually matters for reliable releases.
tags: []
added: 2023-03-23T00:00:00.000Z
---

It's that time of the year. On X, the crusade about whether you should or shouldn't deploy on Fridays started again. Life is indeed cyclical.

> Not deploying on Friday is a huge red flag, indicating a seriously broken process—insufficient testing, for example, a lack of continuous integration and waterfall thinking (deploy many times throughout dev), and most importantly, no culture of quality. Fix all that.\
> \
> — Allen Holub: [https://x.com/allenholub/status/1637111242610610182](https://x.com/allenholub/status/1637111242610610182)\\

What's the truth behind deploying on Fridays, is it worth it, is it a gate to hell?

The main argument against it is that we should care about people and their weekends. Code pushed on Friday could cause an incident over the weekend, outside working hours. I've even seen an extreme version of this argument: that people who do Friday deployments need to grow up, they are not experienced enough, or they aren't considerate of their teammates.

Let me tell you, I care about people. In fact, I care about people that much that I want teams to be able to deploy on Fridays **without fear**, **safely** **and without feeling it's a big deal.**

Because, in the end, the primary emotion that many have is fear. Fear of a critical incident taking away our weekend or our time after work. That fear will push us to be risk-averse and to avoid pain, we'll change our behaviours and practices to protect ourselves.

We can take this risk-averse mindset and push it to absurdity: why don't we block Thursday deploys? Why not Wednesdays? Since we're on it, let's stop all deploys. Any bug could, in fact, cause an incident that rears its ugly head only on weekends, and we surely know the most error-free code on Earth is [the one we don't write](https://github.com/kelseyhightower/nocode).

As Charity Majors writes in “[Deploys: It's not actually about Fridays](https://charity.wtf/2019/10/28/deploys-its-not-actually-about-fridays/)”:

> My entire point is that the behaviors and practices associated with blocking Friday deploys are in fact **hurting your engineers.**\\

[If it hurts, do it more often](https://www.martinfowler.com/bliki/FrequencyReducesDifficulty.html). If you fear deploying on Fridays, the solution is not to run away from it. The fear's telling you your system's flaky or risky, failure can happen **any day**. Take the fear and act on it by improving, your whole system will be better, more reliable and humane—and your weekends will be more enjoyable.

Don't deploy this Friday, or the next, but work towards making it possible over time, to the point it becomes a **simple and boring routine**. Then, if you still don't feel like deploying on a certain day or period of time, that's absolutely fine, but now you can deploy and release safely, with low-risk and [on demand](https://www.continuousdelivery.com#why-continuous-delivery).

A second argument against the idea is that every deploy has risk, the probability of not going bad is never zero, why gamble? Risk will always exist, but by accounting for it and learning to deal with it, we can recover from failure and make our systems—and teams—more resilient and fault-tolerant, which in turns creates happier people with happier weekends. Professionals working in systems where failure can lead to real disasters don't stop doing what they have to do because it's risky; they openly discuss errors, learn from them and create healthy feedback loops.

Learning from errors and creating healthy feedback loops also means that the team building the software is also the one taking care of it. A team should feel the pain of what it creates, and [a fair and humane on call rotation](https://charity.wtf/2020/10/03/on-call-shouldnt-suck-a-guide-for-managers/) is a great way to do it.

***

There are also people that don't believe that deploying on Fridays can feel boring and ordinary. It's possible, but they've never worked in an environment like that; therefore it must not work.

My experience is different, I worked in teams that deployed changes to production many times a day, Monday to Friday, for years. Changes went straight to production automatically, as long as the pipeline was green. Was the company the worst place to work, were the servers always down on weekends, people burned out to death and bugs ran amok, were the teams composed of childish and inexperienced developers? Quite the opposite, it was not perfect—far from it—but it's still one of the best places I've worked in. The teams were full of professional people that cared about quality, resiliency, and their weekends.

Lastly, let's also cover a few things:

* Being able to deploy on Fridays doesn't mean YOLO, nor does it imply that you should be pushing to production with 1.5 picoseconds left before clocking out. We trust each other to make rational decisions.
* The company or the team always decide when and if to [block deploys for business reasons](https://twitter.com/GergelyOrosz/status/1637567573385461762?s=20), and that's completely fine.

In the end, the entire point it's not about deploying on Fridays. It's about:

* Recognizing behaviours that might seem healthy but, counterintuitively, might actually be negative when looking at the big picture.
* Embracing resiliency.
* Making your deployments a boring routine. If it hurts, do it more often.

As a last remark, every organization is different and has a unique context. There might be excellent reasons why deploying on a certain day is not possible or desirable in your specific situation. Do it or don't do it, ultimately the answer is up to the team.
