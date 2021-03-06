import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:groomzy/controller/book_controller.dart';
import 'package:groomzy/model/staff.dart';

class BookingStaffs extends StatelessWidget {
  final List<Staff> staffs;

  const BookingStaffs({
    required this.staffs,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetBuilder<BookController>(
      builder: (c) {
        return SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              ...staffs
                  .map(
                    (staff) => Container(
                      width: 80,
                      constraints: const BoxConstraints(maxWidth: 100),
                      child: Column(
                      children: [
                        GestureDetector(
                          onTap: () {
                            if (c.selectedStaffer == 'none') {
                              c.selectedStaffer = staff.fullName;
                              c.selectedStafferId = staff.id;
                            } else {
                              c.selectedStaffer = 'none';
                              c.selectedStafferId = 0;
                            }
                          },
                          child: CircleAvatar(
                            radius: 30,
                            backgroundColor: Colors.white,
                            child: CircleAvatar(
                              radius: 28,
                              backgroundColor:
                              c.selectedStaffer == staff.fullName
                                  ? Theme.of(context).primaryColor
                                  : Colors.black12,
                              child: CircleAvatar(
                                radius: 25,
                                backgroundColor: Colors.white,
                                child: Text(
                                  staff.fullName.split(' ')[0][0].toString(),
                                  style: const TextStyle(
                                      color: Colors.black, fontSize: 22.0),
                                ),
                              ),
                            ),
                          ),
                        ),
                        AutoSizeText(
                          staff.fullName,
                        ),
                      ],
                    ),),
                  )
                  .toList()
            ],
          ),
        );
      },
    );
  }
}
