settings.outformat = "png";
defaultpen(fontsize(16pt));
unitsize(1cm);

draw(circle((0, 0), 1));
fill(circle((0, 0), 1), lightblue);

draw(circle((2, 0), 0.25));
fill(circle((2, 0), 0.25), lightyellow);

draw(circle((20, 0), 3));
fill(circle((20, 0), 3), yellow);

draw((20, 3) -- (1, 0.2));
draw((20, -3) -- (1, -0.2));

dot((0, 0), blue);
dot((2, 0), green);
dot((20, 0), yellow);

draw((0, 0) -- (2, 0) -- (20, 0), dashed);
draw((0, 0) -- (20, 3) -- (20, -3) -- cycle, dashed);

fill( (1, 0.2) .. (1, 0) .. (1, -0.2) -- (2, -0.35) .. (1.75, 0) .. (2, 0.35) -- cycle, black);

label((0, -0.5), "E");
label((2, -1.2), "M");
label((20.5, -0.2), "S");

  