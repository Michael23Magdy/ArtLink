package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Ellipse extends Shape {
    private Integer radiusX;
    private Integer radiusY;
}
