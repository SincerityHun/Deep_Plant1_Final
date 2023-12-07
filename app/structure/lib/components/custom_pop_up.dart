import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:structure/config/pallete.dart';

String unselectedText = '선택되지 않은 항목이 있습니다.';
String fileUploadFailedText = '파일 업로드 실패';
String successChangeUserInfo = '정상적으로 변경되었습니다.';
String tempSaveText = '임시저장이 완료되었습니다.';
String duplicateEmailText = '중복된 이메일입니다.';
String lateEditText = '작성후 3일이 경과되었습니다.';
String succeedEditText = '이미 승인된 데이터 입니다.';
String failureEditText = '이 데이터는 반려되었습니다!';
String userTypeErrorText = '유저 권한 에러 발생';

void showUnselectedPopup(BuildContext context) {
  // 선택되지않은_popup
  showPopup(context, unselectedText, '');
}

void showFileUploadFailPopup(BuildContext context) {
  // 실패_popup
  showPopup(context, fileUploadFailedText, '');
}

void showSuccessChangeUserInfo(BuildContext context) {
  // 유저 정보 변경 성공
  showPopup(context, successChangeUserInfo, '');
}

void showTemporarySavePopup(BuildContext context) {
  // 임시저장_popup
  showPopup(context, tempSaveText, '확인');
}

void showDuplicateEmailPopup(BuildContext context) {
  // 이메일 중복
  showPopup(context, duplicateEmailText, '');
}

void showDataManageLatePopup(BuildContext context) {
  // 3일 경과
  showPopup(context, lateEditText, '');
}

void showDataManageSucceedPopup(BuildContext context) {
  // 승인 데이터
  showPopup(context, succeedEditText, '');
}

void showDataManageFailurePopup(BuildContext context) {
  // 반려 데이터
  showPopup(context, failureEditText, '');
}

void showUserTypeErrorPopup(BuildContext context) {
  // 유저 권한 에러
  showPopup(context, userTypeErrorText, '');
}

void showPopup(BuildContext context, String contentText, String btnText) {
  showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          child: Stack(
            children: [
              Container(
                width: 638.w,
                height: 233.h,
                padding: EdgeInsets.only(left: 50.w, right: 50.w, top: 58.h, bottom: 30.h),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20.r),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(contentText, style: Palette.popupContent),
                      ],
                    ),
                    const Spacer(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        InkWell(
                            onTap: () {
                              context.pop();
                              context.pop();
                            },
                            child: Text(btnText, style: Palette.popupBtn)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      });
}
