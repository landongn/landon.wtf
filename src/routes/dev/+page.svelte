<h1>Color Harmony Example</h1>
<div class="palette">
	<div class="color-block primary" />
	<div class="color-block dark-primary" />
	<div class="color-block light-primary" />
	<div class="color-block yellow-orange" />
	<div class="color-block dark-yellow-orange" />
	<div class="color-block red-orange" />
	<div class="color-block light-red-orange" />
	<div class="color-block" style="background-color: #212121;" />
	<div class="color-block" style="background-color: #f1f1f1;" />
</div>

<style>
	.palette {
		display: flex;
		gap: 10px;
		padding: 20px;
	}

	.color-block {
		width: 100px;
		height: 100px;
		border: 2px solid #212121; /* Neutral Dark */
		display: inline-block;
	}

	.primary {
		background-color: #007bff;
	}
	.dark-primary {
		background-color: #0056b3;
	}
	.light-primary {
		background-color: #66b0ff;
	}

	.yellow-orange {
		background-color: #ffc107;
	}
	.dark-yellow-orange {
		background-color: #b38600;
	}

	.red-orange {
		background-color: #ff5722;
	}
	.light-red-orange {
		background-color: #ff8666;
	}
</style>
