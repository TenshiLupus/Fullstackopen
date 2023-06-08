import React from "react"
import "@testing-library/jest-dom/extend-expect"
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("renders content", () => {
	let container
	let createBlog

	beforeEach(() => {
		createBlog = jest.fn()
		container = render(<BlogForm createBlog={createBlog}/>).container
	})

	test("Form handler is called and submits right content", async () => {
		const user = userEvent.setup()

		const titleInput = container.querySelector("#title")
		await user.type(titleInput, "testing title")
		const urlInput = container.querySelector("#url")
		await user.type(urlInput, "testing url")
		const authorInput = container.querySelector("#author")
		await user.type(authorInput, "testing author")
		const submitButton = container.querySelector("#submit-button")
		await user.click(submitButton)

		expect(createBlog.mock.calls.length).toBe(1)
		expect(createBlog.mock.calls[0][0].title).toBe("testing title")
		expect(createBlog.mock.calls[0][0].url).toBe("testing url")
		expect(createBlog.mock.calls[0][0].author).toBe("testing author")
	})
})
