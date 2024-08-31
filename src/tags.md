---
layout: default
title: Tags
---

{% for tag in collections.tagList %}

<span class="post-tag">
    <a href="/tags/{{ tag }}">
        {{ tag }}
    </a>
</span>
{% endfor %}
