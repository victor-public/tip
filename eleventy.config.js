import { EleventyHtmlBasePlugin } from "@11ty/eleventy"
import fs from "fs"
import path from "path"
import cssnano from "cssnano"
import postcss from "postcss"
import tailwindcss from "@tailwindcss/postcss"

const {
    PATH_PREFIX = ""
} = process.env

const processor = postcss([
    //compile tailwind
    tailwindcss(),

    //minify tailwind css
    cssnano({
        preset: "default"
    }),
])

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.on("eleventy.before", async () => {
        const tailwindInputPath = path.resolve("./src/assets/styles/index.css")

        const tailwindOutputPath = "./_site/assets/styles/index.css"

        const cssContent = fs.readFileSync(tailwindInputPath, "utf8")

        const outputDir = path.dirname(tailwindOutputPath)
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
        }

        const result = await processor.process(cssContent, {
            from: tailwindInputPath,
            to: tailwindOutputPath,
        })

        fs.writeFileSync(tailwindOutputPath, result.css)
    })

    eleventyConfig.addPassthroughCopy("src/assets/styles")
    eleventyConfig.addPassthroughCopy("src/assets/img")
    eleventyConfig.addPassthroughCopy("src/manifest.json")
    eleventyConfig.addPassthroughCopy({
        "humans.txt": "/humans.txt",
        "robots.txt": "/robots.txt",
    })

    // To create a filter to determine duration of post
    eleventyConfig.addFilter("readTime", (value) => {
        const content = value
        const textOnly = content.replace(/(<([^>]+)>)/gi, "")
        const readingSpeedPerMin = 450
        return Math.max(1, Math.floor(textOnly.length / readingSpeedPerMin))
    })

    // Enable us to iterate over all the tags, excluding posts and all
    eleventyConfig.addCollection("tagList", collection => {
        const tagsSet = new Set()
        collection.getAll().forEach(item => {
            if (!item.data.tags) return
            item.data.tags
                .filter(tag => !["posts", "all"].includes(tag))
                .forEach(tag => tagsSet.add(tag))
        })
        return Array.from(tagsSet).sort()
    })
}

export const config = {
    pathPrefix: PATH_PREFIX || "",
    dir: {
        input: "./src"
    }
}
