import cv2
import xlsxwriter as xl

img = cv2.imread('./test.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
print(img.shape)
h, w, c = img.shape
SCALE_FACTOR = 1
img = cv2.resize(img, (int(SCALE_FACTOR * h), int(SCALE_FACTOR * h)))

# new sizes
h, w, c = img.shape

workbook = xl.Workbook('output.xlsx')
worksheet = workbook.add_worksheet()

# write the numbers on the worksheet
for i in range(h):
    for j in range(w):
        worksheet.write_number(3 * i, j, img[i, j, 0])
        worksheet.write_number(3 * i + 1, j, img[i, j, 1])
        worksheet.write_number(3 * i + 2, j, img[i, j, 2])

for i in range(3 * h, 3 * h + 100):
    worksheet.write_blank(i, 0, '')    # write blank row for white strip

# now add the colouring with conditional formatting
for i in range(h):
    worksheet.conditional_format(3*i, 0, 3*i, w-1, {
        'type': '2_color_scale',
        'min_type': 'num', 'max_type': 'num',
        'min_value': 0,'max_value': 255,
        'min_color': '#000000', 'max_color': '#FF0000'
    })
    worksheet.conditional_format(3*i + 1, 0, 3*i + 1, w-1, {
        'type': '2_color_scale',
        'min_type': 'num', 'max_type': 'num',
        'min_value': 0,'max_value': 255,
        'min_color': '#000000', 'max_color': '#00FF00'
    })
    worksheet.conditional_format(3*i + 2, 0, 3*i + 2, w-1, {
        'type': '2_color_scale',
        'min_type': 'num', 'max_type': 'num',
        'min_value': 0,'max_value': 255,
        'min_color': '#000000', 'max_color': '#0000FF'
    })


# close workbook
workbook.close()
