settings.outformat = "png";
defaultpen(fontsize(16pt));
unitsize(1cm);

draw(circle((0, 0), 3));
fill(circle((0, 0), 3), yellow);

draw(circle((10, 0), 1));
fill(circle((10, 0), 1), lightblue);
fill((10, 1) .. (11, 0) .. (10, -1) -- cycle, darkblue);

draw(circle((10, 2), 0.25));
fill(circle((10, 2), 0.25), lightyellow);

draw((2, -sqrt(5)) -- (10, 1.75), EndArrow(5));
draw((10, 1.75) -- (10.5, 0.8), EndArrow(5));
label((8, 2), "Partial Moon");


draw(circle((8, -1.5), 0.25));
fill(circle((8, -1.5), 0.25), lightyellow);
draw((3, 0) -- (8, -1.25), EndArrow(5));
draw((8, -1.25) -- (10.5, -1), EndArrow(5));

label((8, -2.2), "New Moon");
label((0, 0), "S");
label((9.5, 0), "E");
