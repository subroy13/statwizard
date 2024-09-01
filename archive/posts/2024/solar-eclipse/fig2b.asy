settings.outformat = "png";
defaultpen(fontsize(16pt));
unitsize(1cm);

draw(circle((0, 0), 1));
fill(circle((0, 0), 1), lightblue);

draw(circle((2.25, 0), 0.25));
fill(circle((2.25, 0), 0.25), lightyellow);

draw(circle((10, 0), 3));
fill(circle((10, 0), 3), yellow);

draw((9, 2.85) -- (1, -0.2));
draw((9, -2.85) -- (1, 0.2));

draw((0, 0) -- (2.25, 0) -- (10, 0), dashed);
draw((10, 3) -- (10, -3), dashed);

fill((1, 0.2) .. (1, 0) .. (1, -0.2) -- (2.1, 0.2) .. (2, 0) .. (2.1, -0.2) -- cycle, black);

label((0, -0.5), "E");
label((2, -1.2), "M");
label((10.5, -0.2), "S");
