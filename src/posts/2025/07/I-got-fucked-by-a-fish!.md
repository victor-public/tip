---
title: "I got fucked by a fish!"
date: "2025-07-06"
published: true
cover: 25_07_seabass-cover.jpg
tags:
- color
- pencil
- fish
- sketch
- drawing
---

Long time no see. But... ey! I have a problem in the sea!

<!-- excerpt -->

<figure class="text-center w-full flex justify-center flex-col">
    <img src="/assets/img/posts/25_07_seabass-cover.jpg" alt="Seabass picture" />
    <caption>
        It looks like a seabass, doesn't it?.
    </caption>
</figure>


I've drawn a lot lately. I didn't stop. But I couldn't publish. Technical problems, as 
they say. 

This is how it works: this blog uses a github repository, associated to a deployment tool. Anytime I push on the main branch, a deployment is triggered. The codebase is powered by 
Eleventy, using a template. 

Simple enough, and it has worked quite well for months. But suddenly, it stopped. I wasn't able to publish, Eleventy build didn't work! Long story short, this blog reached some sort of limit, too many pictures. 


<figure class="text-center w-full flex justify-center flex-col">
    <img src="/assets/img/posts/25_07_seabass-details.png" alt="Seabass details" />
    <caption>
        Still I draw a lot this month. Actually, I like some details of the Seabass.
    </caption>
</figure>

The problem was, using Eleventy, at some point we need to move the images to the build folder. The command for it was:

```
 eleventyConfig.addPassthroughCopy("src/assets")
```

With the number of pictures I uploaded so far, that was taking too much. Enough time to cause timeouts in Netlify. This kind of errors aren't easy to debug, but simple to fix. I just added 
a `postbuild` npm script. Now moving files is done using the OS shell, and voila! The pipeline worked again.

So... yep. Do you want to learn to paint in 2025? Be ready to learn devops too!
