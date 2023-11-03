import React from "react"
import "@testing-library/jest-dom/extend-expect"
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("renders content", () => {
	let container
	let mockHandler

	beforeEach(() => {
		const blog = {
			title: "Component testing is done with react-testing-library",
			url: "Test url",
			author: "Test author",
			likes: 1,
			user: {
				name: "Angel"
			}
		}
		mockHandler = jest.fn()
		container = render(<Blog blog={blog} likeIncreaseHandler={mockHandler}/>).container
	})

	test("Default properties rendered", () => {

		const element = container.querySelector(".blogContainer")
		expect(element).toBeDefined()

		const title = element.querySelector(".blog-title")
		expect(title).toBeDefined()
		const author = element.querySelector(".blog-author")
		expect(author).toBeDefined()
		const url = element.querySelector(".blog-url")
		expect(url).toBeNull()
		const likes = element.querySelector(".blog-likes")
		expect(likes).toBeNull()
	})

	test("All properties rendered", async () => {

		const user = userEvent.setup()
		const element = container.querySelector(".blogContainer")
		expect(element).toBeDefined()

		const detailButton = container.querySelector(".detailMode")
		await user.click(detailButton)

		console.log("###Detail mode should have been triggered###")


		const title = element.querySelector(".blog-title")
		expect(title).toBeDefined()
		const author = element.querySelector(".blog-author")
		expect(author).toBeDefined()
		const url = element.querySelector(".blog-url")
		expect(url).not.toBeNull()
		const likes = element.querySelector(".blog-likes")
		expect(likes).not.toBeNull()
	})

	test("Like button clicked twice", async () => {
		const user = userEvent.setup()

		const element = container.querySelector(".blogContainer")
		expect(element).toBeDefined()

		const detailButton = element.querySelector(".detailMode")
		await user.click(detailButton)

		const likes = element.querySelector(".blog-likes")
		expect(likes).toBeDefined()

		const button = element.querySelector(".like-increase")
		expect(button).not.toBeNull()
		await user.click(button)
		expect(mockHandler.mock.calls.length).toBe(1)
		await user.click(button)
		expect(mockHandler.mock.calls.length).toBe(2)
	})
})
