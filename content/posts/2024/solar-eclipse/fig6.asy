settings.outformat = "png";
defaultpen(fontsize(12pt));
unitsize(2cm);

fill(circle((0, 0), 3), paleyellow);
fill(circle((0, 0), 1), paleblue);

draw((-5, 0) -- (5, 0), dashed);
draw((-5, 0) .. (-4, 0.5) .. (-3, 0.7), dashed);
draw((5, 0) .. (4, 0.5) .. (3, 0.7), dashed);

fill(circle((0, 0), 0.25 ), gray);
fill(circle((2, -0.75), 0.25 ), gray);
fill(circle((-2, 0.75), 0.25 ), gray);
fill(circle((1, -0.35), 0.25 ), gray);
fill(circle((-1, 0.35), 0.25 ), gray);


draw(rotate(-20) * ((-2, 0) -- (2, 0)), dotted);

label((0, 2.5), "Sun");
label((0, 1.2), "Earth");
label((-2, 0.25), "M1");
label((-1, -0.15), "M2");
label((0, -0.5), "M3");
label((1, -0.85), "M4");
label((2, -1.25), "M5");
