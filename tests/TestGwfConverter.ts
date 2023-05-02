import { gwfToScs } from "../src";

const gwfText = `<?xml version="1.0" encoding="UTF-8"?>
<GWF version="2.0">
    <staticSector>
        <node type="node/const/perm/general" idtf="therapeutic_department" shapeColor="0" id="94885164737232" parent="0" left="0" top="0" right="187.234" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="482" y="460" haveBus="false" idtf_pos="0">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/group" idtf="department" shapeColor="0" id="94885163225376" parent="0" left="0" top="0" right="95.5781" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="586" y="426" haveBus="false" idtf_pos="0">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/relation" idtf="nrel_head_of_the_department" shapeColor="0" id="94885165612432" parent="0" left="0" top="0" right="225.453" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="385" y="410" haveBus="false" idtf_pos="3">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/group" idtf="doctor" shapeColor="0" id="94885163880192" parent="0" left="0" top="0" right="57.4531" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="48" y="396" haveBus="false" idtf_pos="2">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/general" idtf="Isakova_Maria" shapeColor="0" id="94885163447392" parent="0" left="0" top="0" right="111.469" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="313" y="460" haveBus="false" idtf_pos="0">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/general" idtf="Belsky_Dmitry" shapeColor="0" id="94885162569520" parent="0" left="0" top="0" right="113.359" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="111" y="465" haveBus="false" idtf_pos="0">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/general" idtf="medical_council" shapeColor="0" id="94885164937712" parent="0" left="0" top="0" right="124.25" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="278" y="353" haveBus="false" idtf_pos="0">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/general" idtf="Fedorova_Valentina" shapeColor="0" id="94885156126240" parent="0" left="0" top="0" right="150.938" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="277" y="281" haveBus="false" idtf_pos="1">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/group" idtf="head_physician" shapeColor="0" id="94885163020896" parent="0" left="0" top="0" right="120" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="140" y="182" haveBus="false" idtf_pos="3">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/general" idtf="Hospital_11" shapeColor="0" id="94885164335216" parent="0" left="0" top="0" right="93.2656" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="347" y="222" haveBus="false" idtf_pos="5">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/group" idtf="hospital" shapeColor="0" id="94885164941712" parent="0" left="0" top="0" right="68.0781" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="347" y="128" haveBus="false" idtf_pos="0">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/relation" idtf="nrel_governs" shapeColor="0" id="94885162972512" parent="0" left="0" top="0" right="102.313" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="361" y="302" haveBus="false" idtf_pos="3">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/tuple" idtf="" shapeColor="0" id="94885164625584" parent="0" x="223" y="419" haveBus="false" idtf_pos="0">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <node type="node/const/perm/relation" idtf="nrel_includes" shapeColor="0" id="94885164919152" parent="0" left="0" top="0" right="104.375" bottom="25" textColor="164" text_angle="0" text_font="Times New Roman [Arial]" font_size="10" x="163" y="339" haveBus="false" idtf_pos="1">
            <content type="0" mime_type="" content_visibility="false" file_name=""/>
        </node>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885163287984" parent="0" id_b="94885162972512" id_e="94885163287168" b_x="361" b_y="302" e_x="0" e_y="0" dotBBalance="0" dotEBalance="0.38956">
            <points/>
        </pair>
        <pair type="pair/const/-/perm/orient" idtf="" shapeColor="0" id="94885163287168" parent="0" id_b="94885156126240" id_e="94885164335216" b_x="277" b_y="281" e_x="347" e_y="222" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885163300432" parent="0" id_b="94885163020896" id_e="94885156126240" b_x="140" b_y="182" e_x="277" e_y="281" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885163299344" parent="0" id_b="94885164941712" id_e="94885164335216" b_x="347" b_y="128" e_x="347" e_y="222" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/-/perm/orient" idtf="" shapeColor="0" id="94885163247392" parent="0" id_b="94885156126240" id_e="94885164937712" b_x="277" b_y="281" e_x="278" e_y="353" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885163230976" parent="0" id_b="94885162972512" id_e="94885163247392" b_x="361" b_y="302" e_x="0" e_y="0" dotBBalance="0" dotEBalance="0.416864">
            <points/>
        </pair>
        <pair type="pair/const/-/perm/orient" idtf="" shapeColor="0" id="94885163230064" parent="0" id_b="94885164625584" id_e="94885164937712" b_x="223" b_y="419" e_x="278" e_y="353" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885163229184" parent="0" id_b="94885164919152" id_e="94885163230064" b_x="163" b_y="339" e_x="0" e_y="0" dotBBalance="0" dotEBalance="0.391888">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885164569552" parent="0" id_b="94885164625584" id_e="94885162569520" b_x="223" b_y="419" e_x="111" e_y="465" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885163183120" parent="0" id_b="94885164625584" id_e="94885163447392" b_x="223" b_y="419" e_x="313" e_y="460" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885163182144" parent="0" id_b="94885163880192" id_e="94885162569520" b_x="48" b_y="396" e_x="111" e_y="465" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885164220752" parent="0" id_b="94885163880192" id_e="94885163447392" b_x="48" b_y="396" e_x="313" e_y="460" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/-/perm/orient" idtf="" shapeColor="0" id="94885162057024" parent="0" id_b="94885163447392" id_e="94885164737232" b_x="313" b_y="460" e_x="482" e_y="460" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885164709392" parent="0" id_b="94885165612432" id_e="94885162057024" b_x="385" b_y="410" e_x="0" e_y="0" dotBBalance="0" dotEBalance="0.418688">
            <points/>
        </pair>
        <pair type="pair/const/pos/perm/orient/membership" idtf="" shapeColor="0" id="94885161134272" parent="0" id_b="94885163225376" id_e="94885164737232" b_x="586" b_y="426" e_x="482" e_y="460" dotBBalance="0" dotEBalance="0">
            <points/>
        </pair>
    </staticSector>
</GWF>
`;

gwfToScs(
  gwfText,
  (scs) => {
      console.log(scs)
    },
  (error) => {
    console.log(error)
  }
);
