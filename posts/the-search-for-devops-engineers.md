---
title: The search for DevOps Engineers
slug: the-search-for-devops-engineers
description: >-
  My thoughts on the DevOps engineer role and unrealistic expectations.
  Exploring what DevOps really means and why empathy matters more than technical
  mastery.
tags: []
added: 2020-11-21T00:00:00.000Z
---

A lot of the problems of your team and the company would be solved if you would just get good, and step up your game. You know this Kubernetes thing the cool kids are talking about? This simple technology can be mastered in one day and, honestly, every developer should know it. We expect you to create and configure from scratch services, and deploy to production with a full understanding of your cloud service of choice. Do you say your team is aligned to a flow of work? No worries, mate, I'm letting you in on a little secret: you just need to get good. I'll lend you a hand, there you go, the cloud-native landscape:

![Cloud Native landscape, it shows all the zillion technologies in the space](/assets/devops-massive-map-of-tech.png)

As fictitious and over the top of a situation as it sounds, it could very well be true. It stems from a misunderstanding of what DevOps is, which goes with a certain lack of empathy for other developers and a loss of fast flow as a result.

In The DevOps Handbook and The Phoenix Project, we see the main principles of DevOps, grouped in The Three Ways:

* The First Way: enables and optimizes for fast and smooth left to right flow. The goal is to reduce the time our changes go to production.
* The Second Way: enables reciprocal, fast and constant feedback from right to left. The goal is to create fast and constant feedback so we can achieve safe and resilient systems.
* The Third Way: enables organizational learning and a generative culture.

In The DevOps Handbook, we also see the current technical approaches that enable fast flow and feedback, the most popular being CI/CD. But, as always, transformation comes from within, the culture, habits, and principles of the organization are more important than any technology or specific process it applies. Only focusing on technology and processes without the culture is not sustainable and is bound to fail, the same way modifying our diet is more difficult if we don't focus on becoming a person who embraces a healthier lifestyle.

## DevOps is not about automating everything

Let's take out of the way one of the main misunderstandings: DevOps is all about automation. It's not. Automation is in there, it supports fast flow, the enablement of self-service, the elimination of the constraints in the system, offering a compelling internal product… Automation for the sake of automation is pointless. Moreover, constraints are not necessarily technical, they can manifest in many forms. Strangling fast flow and reducing feedback by having siloed teams is a big and typical organizational constraint.

## What's a DevOps team?

Let's analyse what a DevOps team could be.

One way to start the DevOps transformation is to create a dedicated transformation team. It operates outside the bureaucracy and rules created by the risk-averse company to maintain the status quo. Its members, skilled generalists with respectful relationships with the rest of the organization, are tasked with creating new processes and learnings that will help us achieve the desired goals: reduce lead time, integrate security to pass compliance requirements, etc.

We might assume a so-called DevOps team could be a transformation team, with individuals that understand the principles and strive to create new processes and create institutional learning. This transformation team is not just a rebranded Operations team, that only perpetuates the same problems we want to solve. If a transformation team is composed of skilled generalists, why the need of hiring a team of  DevOps engineers? It makes more sense to hire people with different skills, including infrastructure and operations ones.

In terms of organizing the company, and having Conway's Law in mind, to optimize for fast flow, Matthew Skelton and Manuel Pais in their book Team Topologies show us four fundamental topologies:

* Stream-aligned team: team aligned to a valuable stream of work and empowered to build and deliver user value.
* Enabling team: helps to overcome obstacles and detect missing capabilities.
* Complicated Subsystem team: team where significant and specific expertise is needed.
* Platform team: provides a compelling internal product to accelerate delivery.

The stream-aligned team is the primary type. The rest of the teams exist to reduce the burden on it.

Based on the topologies, we might assume a "DevOps team" could be an enabling or platform team. Why call it a DevOps team?

If the team is an enabling one, then it would be composed of specialists in a given domain. The members of the team are not DevOps engineers, but experts in their area:

> Enabling teams should plan for their own extinction from the very first day to avoid other teams becoming dependent. \
> \
> A platform team has a strong focus on usability and reliability for their services (treating the platform as a product) and regularly assesses if the services are still fit for purpose and usable. \
> \
> — Team Topologies.

If the team is a platform team, its members would be knowledgeable of whatever technologies the platform offers, though, as we see in the book, the Thinnest Viable Platform (TVP) could even just be a wiki page:

> This TVP could be just a wiki page if that's all you need for your platform - it says we use this cloud provider and we only use these services from a cloud provider and here's the way we use them \
> \
> — Matthew Skelton

If the platform team is abstracting cloud providers, we'd need an engineer familiar with, among other things, cloud-native and the cloud provider. If another platform team is providing a compelling internal product in another area, then the team members are familiar with that area.

## Operations Rebranded

Looking into the DevOps philosophy, calling someone a DevOps engineer or having a DevOps team doesn't make any sense. These words are just used to rebrand Operations without engaging in any significant transformation, in the same spirit of using Scrum™ without considering what it means to be Agile in the first place.

Don't get me wrong, engineers with operations/infrastructure skills are more important than ever, especially with cloud-native, and the "APIfication" of the infrastructure and the explosion of tools.

The reality is that the term "DevOps engineer" is here to stay. Let's remember that the benefits we want don't just come from hiring engineers with these titles or changing the name of a team to "DevOps team" and, boom, transformation done, but from transforming ourselves into the people, teams and organisations that embrace the three ways.
