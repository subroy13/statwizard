settings.outformat = "png";
defaultpen(fontsize(16pt));
unitsize(1.5cm);

fill(box((-1, -1), (5, 5)), white);
fill(box((0, 4), (1, 3)), lightred);
fill(box((3, 3), (4, 4)), lightblue);
fill(box((1, 3), (3, 4)), gray);
fill(box((1, 1), (2, 2)), gray);
fill(box((3, 0), (4, 2)), gray);

for (int i = 0; i < 5; ++i) {
    draw((0, i) -- (4, i));
    draw((i, 0) -- (i, 4));
}

label("-1.61", (0.5, 3.5));
label("100", (3.5, 3.5));
label("1.01", (0.5, 2.5));
label("7.4", (1.5, 2.5));
label("19.31", (2.5, 2.5));
label("52.45", (3.5, 2.5));
label("-1.21", (0.5, 1.5));
label("7.78", (2.5, 1.5));
label("-1.74", (0.5, 0.5));
label("-0.83", (1.5, 0.5));
label("1.94", (2.5, 0.5));





