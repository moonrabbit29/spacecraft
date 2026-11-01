<script lang="ts">
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';
</script>

<div class="social-media-section">
	<img src="social/cat-stronout.png" alt="cat" class="cat-stronout-img" />
	<Container fluid class="social-container">
		<Row class="d-flex align-items-center social-row">
			<Col md={{ offset: 2 }}>
				<div class="headline">INTERESTED IN</div>
			</Col>
		</Row>
		<Row class="d-flex align-items-center mb-5 social-row">
			<Col md={{ offset: 2 }}>
				<div class="headline bold">WORKING TOGETHER WITH US?</div>
			</Col>
		</Row>
		<Row class="d-flex align-items-center mb-4 social-row">
			<Col md={{ offset: 2 }}>
				<div class="start-a-project-social-media">
					<p class="cta-text">Start a Project</p>
					<img src="icons/arrow.png" alt="icon" class="icon-in-social-media-section" />
				</div>
			</Col>
		</Row>
		<Row class="mb-4">
			<Col md={{ offset: 2, size: 8 }}>
				<hr class="separator" />
			</Col>
		</Row>
		<Row class="d-flex align-items-center mb-5">
			<Col md={{ offset: 2 }}>
				<a href="https://www.instagram.com/arfianaarya" target="_blank" class="social-link">
					<div class="social-media-button">
						<p class="instagram-text">Instagram</p>
					</div>
				</a>
			</Col>
		</Row>
		<Row class="d-flex align-items-center justify-content-center mt-5">
			<img src="space_craft.png" alt="cat" class="space-craft-footer-img" />
		</Row>
	</Container>
</div>

<style>
	.social-media-section {
		position: relative;
		width: 100%;
		height: 500px;
		background-color: black;
	}

	:global(.social-container) {
		padding-top: 75px;
	}

	:global(.social-row) {
		position: relative;
		z-index: 1;
	}

	.headline {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 3.75rem;
		font-weight: lighter;
		color: white;
	}

	.headline.bold {
		font-weight: bold;
	}

	.start-a-project-social-media {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 150px;
		height: 30px;
		padding-left: 12px;
		background-color: black;
		border: 0.5px solid white;
		border-radius: 25px;
		cursor: pointer;
	}

	.cta-text {
		margin: 15px 0 0 5px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: small;
		color: white;
	}

	.icon-in-social-media-section {
		width: 25px;
		height: 25px;
	}

	.separator {
		height: 2px;
		background: white;
		border: none;
	}

	.social-link {
		text-decoration: none;
	}

	.social-media-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 125px;
		height: 30px;
		background-color: white;
		border-radius: 25px;
		cursor: pointer;
	}

	.instagram-text {
		margin: 15px 0 0 5px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: small;
		font-weight: bold;
		color: black;
	}

	.cat-stronout-img {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 0;
		width: 30%;
		min-height: 50vh;
		overflow: hidden;
	}

	.space-craft-footer-img {
		position: relative;
		z-index: 0;
		width: 20%;
		min-height: 20%;
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.social-media-section {
			height: auto;
			padding-bottom: 48px;
		}

		:global(.social-container) {
			padding-top: 48px;
		}

		.headline {
			font-size: 2.25rem;
		}

		.cat-stronout-img {
			width: 45%;
			min-height: 30vh;
			opacity: 0.5;
		}
	}
</style>
