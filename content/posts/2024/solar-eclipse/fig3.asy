settings.outformat = "png";
defaultpen(fontsize(16pt));
unitsize(1cm);

draw(circle((0, 0), 3));
fill(circle((0, 0), 3), yellow);

draw(circle((10, 0), 1));
fill(circle((10, 0), 1), lightblue);

draw(circle((8, 0), 0.25));
fill(circle((8, 0), 0.25), lightyellow);


draw((0, 0) -- (10, 0), dashed);
draw((0, 0) -- (9.75, 2.22), dotted);

draw(circle((9.75, 2.22), 1), dotted);
fill(circle((9.75, 2.22), 1), paleblue);

draw(circle((7.8, 2.22), 0.25), dotted);
fill(circle((7.8, 2.22), 0.25), paleyellow);

draw(circle((7.8, 1.8), 0.25), dotted);


label((10, -0.5), "E");
label((0, -0.5), "S");
label((9.75, 1.8), "E'");
label((8, -0.5), "M");
label((7.8, 2.8), "M'");
