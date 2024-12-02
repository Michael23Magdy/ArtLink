package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Text extends Shape {
    private String text;
    private String fontSize;
    private String fontFamily;
    private Integer width;
}
