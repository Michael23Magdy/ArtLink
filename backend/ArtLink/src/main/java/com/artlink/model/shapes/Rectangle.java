package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Rectangle extends Shape {
    private Integer width;
    private Integer height;
}
