describe("Blog app", function() {
	beforeEach(function() {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
		const user = {
			name: "MOTS",
			username: "ameseraph",
			password: "password"
		}
		const secondUser = {
			name: "Ganso",
			username: "Pato",
			password: "password"
		}
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, secondUser)
		cy.visit("")
	})

	it("Login form is shown", function() {
		cy.get(".login-form")
	})

	describe("Login", () => {
		it("succeeds with correct credentials", function() {
			cy.login({ username: "ameseraph", password: "password" })
		})

		it("fails with wrong credentials", function() {
			cy.contains("Log in").click()
			cy.get("#username").type("ameseraph")
			cy.get("#password").type("popo")
			cy.get("#login-button").click()

			cy.get(".error").should("contain", "Wrong credentials")
				.and("have.css", "color", "rgb(255, 0, 0)")
				.and("have.css", "border-style", "solid")

			cy.get("html").should("not.contain", "MOTS logged in")
		})
	})

	describe("When logged in", () => {
		beforeEach(() => {
			cy.login({ username: "ameseraph", password: "password" })
		})

		it("a new blog can be created", function() {
			cy.createBlog({ title: "Polient", author: "Angel", url: "sidharta golem" })
			cy.contains("Polient")
		})

		it("click an blog like button", () => {
			cy.createBlog({ title: "Polient", author: "Angel", url: "sidharta golem" })
			cy.get(".blogContainer").find("button").click()
			cy.get(".like-increase").click()
			cy.get(".blog-likes").should("contain", "1")
		})

		it("remove blog created by user", () => {
			cy.createBlog({ title: "Polient", author: "Angel", url: "sidharta golem" })
			cy.get(".user-name").should("contain", "ameseraph")
			cy.get(".blogContainer").find("button").click()
			cy.get(".blog-username").should("contain", "ameseraph")
			cy.get(".remove-blog-button").click()
			cy.on("window:confirm", () => true)
			cy.get("html").should("not.contain", "Polient")
		})

		it("ordered by amount of likes", () => {
			cy.createBlog({ title: "Blog with least likes", author: "Angel", url: "sidharta" })
			cy.createBlog({ title: "Blog with most likes", author: "Angel", url: "sidharta golem" })
			cy.get(".blogContainer").eq(0).find("button").click()
			cy.get(".blogContainer").eq(1).find("button").click()
			cy.get(".like-increase").eq(1).click()
			cy.get(".like-increase").eq(0).click()
			cy.get(".blog-likes").eq(0).should("contain", "2")
		})
	})



})